import type { ErrorResult } from "@/helpers/response";
import { created, notAllowed, badRequest, forbidden } from "@/helpers/response";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import type { Post } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { postSchema } from "../newpost";

export type NewPostSuccessResult = {
  post: Post;
};

export type NewPostResult = NewPostSuccessResult | ErrorResult;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<NewPostResult>
) => {
  // todo: move to middleware
  if (req.method !== "POST") {
    return notAllowed(res, "POST");
  }

  const session = await getServerAuthSession({ req, res });

  if (!session) {
    return forbidden(res);
  }

  const parsedBody = postSchema.safeParse(JSON.parse(req.body as string));

  if (!parsedBody.success) {
    return badRequest(res, parsedBody.error.message);
  }

  const createdPost = await prisma.post.create({
    data: {
      ...parsedBody.data,
      author: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });

  return created(res, { post: createdPost });
};

export default handler;

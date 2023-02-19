import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import type { Post } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { postSchema } from "../newpost";

export type NewPostSuccessResponse = {
  post: Post;
};

export type NewPostErrorResponse = {
  message: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<NewPostSuccessResponse | NewPostErrorResponse>
) => {
  if (req.method !== "POST") {
    return res.status(405).setHeader("Allow", ["POST"]);
  }

  const session = await getServerAuthSession({ req, res });

  if (!session) {
    return res.status(401);
  }

  const parsedBody = postSchema.safeParse(JSON.parse(req.body as string));

  if (!parsedBody.success) {
    return res.status(400).json({
      message: parsedBody.error.message,
    });
  }

  const result = await prisma.post.create({
    data: {
      ...parsedBody.data,
      author: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });

  return res.status(200).json({ post: result });
};

export default handler;

import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import type { Post } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { postSchema } from "../newpost";

export type PostResponse = {
  post: Post;
};

export type ErrorResponse = {
  message: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<PostResponse | ErrorResponse>
) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method not supported.` });
  }

  const session = await getServerAuthSession({ req, res });

  if (!session) {
    return res.send({ message: "You are not authorised to post" });
  }

  const parsedBody = postSchema.safeParse(JSON.parse(req.body as string));

  if (!parsedBody.success) {
    return res.status(400).send({
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

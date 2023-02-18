import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import type { NextApiRequest, NextApiResponse } from "next";
import type { PostSchema } from "../newpost";
import { postSchema } from "../newpost";

export interface PostApiRequest extends NextApiRequest {
  body: PostSchema;
}

type PostResponse = {
  posts: PostSchema[];
};

type ErrorResponse = {
  message: string;
};

const handler = async (
  req: PostApiRequest,
  res: NextApiResponse<PostResponse | ErrorResponse>
) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method not supported.` });
    return;
  }

  const session = await getServerAuthSession({ req, res });

  if (!session) {
    res.send({ message: "You are not authorised to post" });
    return;
  }

  const parsedBody = postSchema.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).send({
      message: parsedBody.error.message,
    });
  }

  res.status(200).json({ message: `Title ${req.body.title}` });
  // const id = 0; //todo get from prisma
  // const result = prisma.post.create({
  //   data: {
  //     ...parsedBody,
  //     authorId: "12",
  //   },
  // });
  // todo: return redirect to post/[id]
  // res.redirect(307, `/post/${id}`);
};

export default handler;

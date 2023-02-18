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

export default function handler(
  req: PostApiRequest,
  res: NextApiResponse<PostResponse | ErrorResponse>
) {
  const { title, size, brand } = req.body;
  if (req.method === "POST") {
    const result = postSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).send({
        message: result.error.message,
      });
    }
    res.status(200).json({ message: `Title ${title}` });
  }
  // HTTP method not supported!
  else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method not supported.` });
  }
}

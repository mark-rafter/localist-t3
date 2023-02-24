import type { NextApiResponse } from "next";

export type ErrorResult = {
  message: string;
};

export const badRequest = (
  res: NextApiResponse<ErrorResult>,
  message: string
) => res.status(400).send({ message });

export const created = <TResult>(
  res: NextApiResponse<TResult>,
  result: TResult
) => res.status(201).json(result);

export const forbidden = (res: NextApiResponse<ErrorResult>) =>
  res.status(403).send({ message: "Forbidden" });

export const notAllowed = (
  res: NextApiResponse<ErrorResult>,
  allowedMethod: "GET" | "PUT" | "POST"
) =>
  res
    .status(405)
    .setHeader("Allow", [allowedMethod])
    .send({ message: `Method Not Allowed, must be: ${allowedMethod}` });

export const notFound = (res: NextApiResponse<ErrorResult>, message?: string) =>
  res.status(404).send({ message: message || "Not Found" });

export const ok = <TResult>(res: NextApiResponse<TResult>, result: TResult) =>
  res.status(200).json(result);

export const serverError = (
  res: NextApiResponse<ErrorResult>,
  message: string
) => res.status(500).json({ message });

export const ssrRedirect = (destination: string) => ({
  redirect: { permanent: false, destination: destination },
});
export const ssrNotFound: { notFound: true } = { notFound: true };

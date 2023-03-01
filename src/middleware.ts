export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/newpost", "/messages", "/bookmarks", "/profile"],
};

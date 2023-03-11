import { Feed } from "@/components/feed";
import type { FeedProps } from "@/components/feed/feed";
import { generateFakePost } from "@/helpers/fakes";
import { render } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

it("renders Feed unchanged", () => {
  const posts = [
    {
      ...generateFakePost(),
      author: {
        lat: 51,
        long: 0,
      },
    },
    {
      ...generateFakePost(),
      author: {
        lat: 50,
        long: 1,
      },
    },
  ] as FeedProps["posts"];
  const { container } = render(
    <SessionProvider session={null}>
      <Feed posts={posts} />
    </SessionProvider>
  );
  expect(container).toMatchSnapshot();
});

import { Feed } from "@/components/feed";
import type { FeedProps } from "@/components/feed/feed";
import { render } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

it("renders Feed unchanged", () => {
  Date.now = jest.fn(() => new Date(2023, 1, 10).getTime());

  const posts: FeedProps["posts"] = [
    {
      id: 1,
      title: "One Red shoe",
      size: "small",
      price: 123,
      images: ["/1_1.png", "/1_2.png"],
      createdAt: new Date(2023, 0, 1),
      author: {
        lat: 51,
        long: 0,
      },
    },
    {
      id: 2,
      title: "Two Blue shoes",
      size: "xl",
      price: 456,
      images: ["/2_1.png", "/2_2.png"],
      createdAt: new Date(2023, 1, 2),
      author: {
        lat: 50,
        long: 1,
      },
    },
  ];
  const { container } = render(
    <SessionProvider session={null}>
      <Feed posts={posts} />
    </SessionProvider>
  );
  expect(container).toMatchSnapshot();
});

import { Feed, type FeedProps } from "@/components/feed";
import { generateFakePost } from "@/helpers/fakes";
import { faker } from "@faker-js/faker";
import { render } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

afterEach(() => {
  faker.seed();
});

it("renders Feed unchanged", () => {
  faker.seed(111);
  Date.now = jest.fn(() => faker.date.soon().getTime());

  const posts: FeedProps["posts"] = [
    {
      id: 1,
      ...generateFakePost(1234),
      author: {
        lat: 51,
        long: 0,
      },
    },
    {
      id: 2,
      ...generateFakePost(5678),
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

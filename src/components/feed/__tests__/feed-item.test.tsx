import { FeedItem } from "@/components/feed";
import { generateFakePost } from "@/helpers/fakes";
import { faker } from "@faker-js/faker";
import { render } from "@testing-library/react";

afterEach(() => {
  faker.seed();
});

it("renders FeedItem unchanged", () => {
  const { container } = render(
    <FeedItem
      id={1}
      {...generateFakePost(1234)}
      distance="X miles away"
      postAge="X days ago"
      isPreview={false}
    />
  );

  expect(container).toMatchSnapshot();
});

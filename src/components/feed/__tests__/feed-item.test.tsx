import { FeedItem } from "@/components/feed";
import { render } from "@testing-library/react";

it("renders HomePage unchanged", () => {
  const { container } = render(
    <FeedItem
      id={1}
      title="test"
      size="xs"
      price={123}
      images={["/image1.png", "/image2.png"]}
      distance="X miles away"
      postAge="X days ago"
      isPreview={false}
    />
  );
  expect(container).toMatchSnapshot();
});

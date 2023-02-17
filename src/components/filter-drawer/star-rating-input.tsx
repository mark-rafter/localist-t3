import { useState } from "react";
import { Rating } from "flowbite-react";

type NumberBetween1And5 = 1 | 2 | 3 | 4 | 5;

const StarRatingInput = ({
  defaultValue,
}: {
  defaultValue: NumberBetween1And5;
}) => {
  // todo: reset input
  // todo: bubble up onChange
  const [rating, setRating] = useState<number>(defaultValue);
  return (
    <Rating>
      {[...Array<NumberBetween1And5>(5)].map((star, index) => {
        index += 1;
        return (
          <button type="button" key={index} onClick={() => setRating(index)}>
            <Rating.Star key={star} filled={index <= rating} />
          </button>
        );
      })}
      <p className="ml-2 text-sm font-medium text-gray-400">
        {rating} out of 5
      </p>
    </Rating>
  );
};

export default StarRatingInput;

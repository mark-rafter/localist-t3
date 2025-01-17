import { faker } from "@faker-js/faker";
import type { User } from "@prisma/client";
import { ItemSize } from "@prisma/client";

export function generateFakePost(seed?: number) {
  if (seed) {
    faker.seed(seed);
  }
  const createdAt = faker.date.recent({ days: 7 });
  return {
    title: faker.commerce.productName(),
    size: faker.helpers.arrayElement(Object.values(ItemSize)),
    price: faker.number.int({ min: 1, max: 9999 }),
    images: [
      faker.image.urlLoremFlickr({
        category: "cats",
        width: 500,
        height: 500,
      }),
      faker.image.urlLoremFlickr({
        category: "cats",
        width: 500,
        height: 500,
      }),
    ],
    createdAt,
    approvedAt: faker.date.soon({ refDate: createdAt }),
  };
}

export function generateFakeUser() {
  const [latitude, longitude] = faker.location.nearbyGPSCoordinate([51.5, 0]);
  return {
    name: faker.internet.userName().toLowerCase(),
    email: faker.internet.email().toLocaleLowerCase(),
    image: faker.image.avatar(),
    lat: latitude,
    long: longitude,
  } as User;
}

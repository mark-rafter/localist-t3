import { faker } from "@faker-js/faker";
import type { Prisma, User } from "@prisma/client";
import { ItemSize } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const USERS_TO_CREATE = 15;
const POSTS_MIN = 1;
const POSTS_MAX = 6;

async function run() {
  const users = await createUsers();
  const userIds = users.map((u) => u.id);
  await createUserLocations(userIds);
  await createPosts(userIds);

  await prisma.$disconnect();
}

// disabling as this is just a dev script
// eslint-disable-next-line @typescript-eslint/no-floating-promises
run();

async function createPosts(userIds: string[]) {
  const posts: Prisma.PostCreateInput[] = [];

  userIds.forEach((userId) => {
    const amount = faker.number.int({ min: POSTS_MIN, max: POSTS_MAX });

    [...Array(amount).keys()].forEach(() => {
      posts.push({
        title: faker.commerce.productName(),
        brand: faker.helpers.arrayElement(["nike", "adidas", "reebok"]),
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
        createdAt: faker.date.recent(),
        author: {
          connect: {
            id: userId,
          },
        },
      });
    });
  });

  const createPosts = posts.map((post) => prisma.post.create({ data: post }));

  await prisma.$transaction(createPosts);
}

async function createUserLocations(userIds: string[]) {
  const coordDictionary = new Map<string, number[]>();
  const createLocations = userIds.map((userId) => {
    const [latitude, longitude] = faker.location.nearbyGPSCoordinate([51.5, 0]);

    coordDictionary.set(userId, [latitude, longitude]);

    return prisma.userLocation.create({
      data: {
        userId: userId,
        lat: latitude,
        long: longitude,
      },
    });
  });

  await prisma.$transaction(createLocations);

  const updateCoords = userIds.map((userId) => {
    const [latitude, longitude] = coordDictionary.get(userId) ?? [];

    return prisma.$executeRaw`
        UPDATE "user_location"
        SET "coords" = st_point(${latitude}, ${longitude})
        WHERE "user_id" = ${userId}`;
  });

  await prisma.$transaction(updateCoords);
}

async function createUsers() {
  const userData = Array(USERS_TO_CREATE)
    .fill(null)
    .map(() => {
      return {
        name: faker.internet.userName().toLowerCase(),
        email: faker.internet.email().toLocaleLowerCase(),
        image: faker.image.avatar(),
      } as User;
    });

  const createUsers = userData.map((user) =>
    prisma.user.create({ data: user })
  );

  const users = await prisma.$transaction(createUsers);
  return users;
}

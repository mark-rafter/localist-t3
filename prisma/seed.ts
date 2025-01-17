import { generateFakePost, generateFakeUser } from "@/helpers/fakes";
import { faker } from "@faker-js/faker";
import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const USERS_TO_CREATE = 15;
const POSTS_MIN = 1;
const POSTS_MAX = 6;
const RATINGS_MIN = 4;
const RATINGS_MAX = 12;

async function run() {
  await seedFromBlank();

  await prisma.$disconnect();
}

// disabling as this is just a dev script
// eslint-disable-next-line @typescript-eslint/no-floating-promises
run();

async function seedFromBlank() {
  const createdUserIds = await createUsers();
  await createUserRatings(createdUserIds);
  await createPosts(createdUserIds);
}

async function createPosts(userIds: string[]) {
  const generateFakePostForUser = (userId: string) =>
    ({
      ...generateFakePost(),
      author: {
        connect: {
          id: userId,
        },
      },
    }) as Prisma.PostCreateInput;

  const postData = userIds.flatMap((userId) =>
    faker.helpers.multiple(() => generateFakePostForUser(userId), {
      count: { min: POSTS_MIN, max: POSTS_MAX },
    }),
  );

  const createPosts = postData.map((post) =>
    prisma.post.create({ data: post }),
  );

  await prisma.$transaction(createPosts);
}

async function createUserRatings(userIds: string[]) {
  const generateFakeRatingsByUser = (userIds: string[], byUserId: string) => {
    const generateFakeRating = (otherUserIds: string[], byUserId: string) =>
      ({
        score: faker.number.int({ min: 1, max: 5 }),
        ratedByUser: {
          connect: { id: byUserId },
        },
        ratingForUser: {
          connect: { id: faker.helpers.arrayElement(otherUserIds) },
        },
      }) as Prisma.UserRatingCreateInput;

    const otherUserIds = userIds.filter((id) => id === byUserId);
    return faker.helpers.multiple(
      () => generateFakeRating(otherUserIds, byUserId),
      {
        count: { min: RATINGS_MIN, max: RATINGS_MAX },
      },
    );
  };

  const ratingData = userIds.flatMap((userId) =>
    generateFakeRatingsByUser(userIds, userId),
  );

  const createRatings = ratingData.map((rating) =>
    prisma.userRating.create({ data: rating }),
  );

  await prisma.$transaction(createRatings);
}

async function createUsers() {
  const userData = faker.helpers.multiple(generateFakeUser, {
    count: USERS_TO_CREATE,
  });

  const createUsers = userData.map((user) =>
    prisma.user.create({ data: user }),
  );

  const users = await prisma.$transaction(createUsers);
  return users.map((u) => u.id);
}

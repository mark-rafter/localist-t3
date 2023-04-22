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
  const createdUserIds = await createUsers();
  await createUserRatings(createdUserIds);
  await createPosts(createdUserIds);

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
        ...generateFakePost(),
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

async function createUserRatings(userIds: string[]) {
  const generateFakeRatingsByUser = (userIds: string[], byUserId: string) => {
    const generateFakeRating = (otherUserIds: string[], byUserId: string) =>
      ({
        score: faker.number.int({ min: 0, max: 5 }),
        ratedByUser: {
          connect: { id: byUserId },
        },
        ratingForUser: {
          connect: { id: faker.helpers.arrayElement(otherUserIds) },
        },
      } as Prisma.UserRatingCreateInput);

    const amount = faker.number.int({ min: RATINGS_MIN, max: RATINGS_MAX });
    const otherUserIds = userIds.filter((id) => id === byUserId);
    return Array(amount)
      .fill(null)
      .map(() => generateFakeRating(otherUserIds, byUserId));
  };

  const ratingData = userIds.flatMap((userId) =>
    generateFakeRatingsByUser(userIds, userId)
  );

  const createRatings = ratingData.map((rating) =>
    prisma.userRating.create({ data: rating })
  );

  await prisma.$transaction(createRatings);
}

async function createUsers() {
  const userData = Array(USERS_TO_CREATE).fill(null).map(generateFakeUser);

  const createUsers = userData.map((user) =>
    prisma.user.create({ data: user })
  );

  const users = await prisma.$transaction(createUsers);
  return users.map((u) => u.id);
}

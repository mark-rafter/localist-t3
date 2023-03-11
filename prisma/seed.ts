import { generateFakePost, generateFakeUser } from "@/helpers/fakes";
import { faker } from "@faker-js/faker";
import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const USERS_TO_CREATE = 15;
const POSTS_MIN = 1;
const POSTS_MAX = 6;

async function run() {
  const users = await createUsers();
  const userIds = users.map((u) => u.id);
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

async function createUsers() {
  const userData = Array(USERS_TO_CREATE).fill(null).map(generateFakeUser);

  const createUsers = userData.map((user) =>
    prisma.user.create({ data: user })
  );

  const users = await prisma.$transaction(createUsers);
  return users;
}

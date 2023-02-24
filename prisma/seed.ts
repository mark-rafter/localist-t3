import { sample } from "@/helpers/sample";
import { faker } from "@faker-js/faker";
import type { Prisma, User } from "@prisma/client";
import { Size } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const USERS_TO_CREATE = 20;
const POSTS_MIN = 1;
const POSTS_MAX = 20;

async function run() {
  const users = await createUsers();
  await createPosts(users);

  await prisma.$disconnect();
}

run();

async function createPosts(users: User[]) {
  const posts: Prisma.PostCreateInput[] = [];

  users.forEach((user) => {
    const amount = faker.datatype.number({ min: POSTS_MIN, max: POSTS_MAX });

    [...Array(amount).keys()].forEach(() => {
      posts.push({
        title: faker.lorem.sentence(),
        brand: faker.helpers.arrayElement(["nike", "adidas", "reebok"]),
        size: sample(Object.values(Size)) as Size,
        price: Math.floor(Math.random() * 9999),
        images: [faker.image.cats(500, 500), faker.image.cats(500, 500)],
        author: {
          connect: {
            id: user.id,
          },
        },
      });
    });
  });

  const createPosts = posts.map((post) => prisma.post.create({ data: post }));

  await prisma.$transaction(createPosts);
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

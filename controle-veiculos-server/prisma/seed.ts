import prismaClient from '../src/prisma';

async function main() {
  await prismaClient.admin.create({
    data: {
      email: 'admin@6bil.com',
      password: 'secinfor',
    },
  });
}
main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });

//https://chatgpt.com/share/1072aa4a-70ec-4565-a00f-80d54991fa35

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const categories = ['Food', 'Toy', 'Electric', 'Sports']

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category },
      update: {},
      create: { name: category },
    })
  }
}

main()
  .then(() => {
    console.log('Seeding finished.')
  })
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

import { PrismaClient } from '../src/generated/prisma'
import fs from 'fs'

const prisma = new PrismaClient()

async function main() {
  const words = JSON.parse(fs.readFileSync('./scripts/words.json', 'utf-8'))

  await prisma.word.createMany({
    data: words.map((word: any) => ({
      name: word.name,
      imageUrl: word.image,
      soundUrl: word.sound,
      genre: word.type
    })),
  })

  console.log(`${words.length} 件の単語を登録しました`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

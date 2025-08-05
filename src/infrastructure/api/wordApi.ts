import { PrismaClient } from '../../generated/prisma'

const prisma = new PrismaClient()

export const getAllWords = async () => {
  try {
    const words = await prisma.word.findMany({
      orderBy: { id: 'asc' }
    })
    return words
  } catch (error) {
    console.error(error)
    throw new Error('単語データの取得に失敗しました')
  }
}

import { getAllWords } from '../../infrastructure/api/wordApi'
import { Word } from '../entities/Word'

export const fetchWords = async (): Promise<Word[]> => {
  const data = await getAllWords()
  // Prismaの戻り値 → Entityへ変換
  return data.map(word => new Word(
    word.id,
    word.name,
    word.imageUrl,
    word.soundUrl,
    word.genre
  ))
}

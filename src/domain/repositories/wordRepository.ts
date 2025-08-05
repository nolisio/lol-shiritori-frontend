import { Word } from '../entities/Word'

// Prismaの代わりにMockを使用するため、このファイルは使用しない
// 代わりにMockWordRepositoryを使用

export const fetchWords = async (): Promise<Word[]> => {
  // モックデータを返す
  return [
    new Word(1, 'りんご', '', '', '食べ物'),
    new Word(2, 'ごりら', '', '', '動物'),
    new Word(3, 'らっぱ', '', '', '楽器'),
  ]
}

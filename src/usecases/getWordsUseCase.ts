import { fetchWords } from '../domain/repositories/wordRepository'

export const getWordsUseCase = async () => {
  return await fetchWords()
}
import { Word } from '../../domain/entities/Word';
import { mockWordRepository } from '../../infrastructure/repositories/MockWordRepository';

export class GetWordsUseCase {
  async execute(): Promise<Word[]> {
    try {
      return await mockWordRepository.getAllWords();
    } catch (error) {
      console.error('Failed to get words:', error);
      throw new Error('単語の取得に失敗しました');
    }
  }
}

// ファクトリー関数として export
export const getWordsUseCase = async (): Promise<Word[]> => {
  const useCase = new GetWordsUseCase();
  return useCase.execute();
};

import { Word } from '../../domain/entities/Word';
import { MockWordRepository } from '../../infrastructure/repositories/MockWordRepository';

export class GetWordsUseCase {
  private wordRepository: MockWordRepository;

  constructor() {
    this.wordRepository = new MockWordRepository();
  }

  async execute(): Promise<Word[]> {
    try {
      return await this.wordRepository.getAllWords();
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

import { Word } from '../../domain/entities/Word';

// モックデータ
const mockWordsData = [
  { id: 1, name: 'りんご', imageUrl: '', soundUrl: '', genre: 'くだもの' },
  { id: 2, name: 'ごりら', imageUrl: '', soundUrl: '', genre: 'どうぶつ' },
  { id: 3, name: 'らくだ', imageUrl: '', soundUrl: '', genre: 'どうぶつ' },
  { id: 4, name: 'だるま', imageUrl: '', soundUrl: '', genre: 'おもちゃ' },
  { id: 5, name: 'まくら', imageUrl: '', soundUrl: '', genre: 'かぐ' },
  { id: 6, name: 'らっぱ', imageUrl: '', soundUrl: '', genre: 'がっき' },
  { id: 7, name: 'ぱんだ', imageUrl: '', soundUrl: '', genre: 'どうぶつ' },
  { id: 8, name: 'だいこん', imageUrl: '', soundUrl: '', genre: 'やさい' },
  { id: 9, name: 'こんにゃく', imageUrl: '', soundUrl: '', genre: 'たべもの' },
  { id: 10, name: 'くじら', imageUrl: '', soundUrl: '', genre: 'どうぶつ' },
  { id: 11, name: 'らいおん', imageUrl: '', soundUrl: '', genre: 'どうぶつ' },
  { id: 12, name: 'んじゃめな', imageUrl: '', soundUrl: '', genre: 'キャラクター' },
];

export const mockWordRepository = {
  async getAllWords(): Promise<Word[]> {
    // 非同期処理をシミュレート
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 「ん」で終わる単語は除外（しりとりのため）
    const validWords = mockWordsData.filter(word => !word.name.endsWith('ん'));
    
    return validWords.map(word => new Word(
      word.id,
      word.name,
      word.imageUrl,
      word.soundUrl,
      word.genre
    ));
  }
};

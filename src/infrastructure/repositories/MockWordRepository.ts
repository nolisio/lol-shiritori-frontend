import { Word } from '../../domain/entities/Word';

// LOLチャンピオン名を含むモックデータ
const mockWordsData = [
  { id: 1, name: 'アーリ', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 2, name: 'リヴェン', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 3, name: 'ベイガー', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 4, name: 'ガリオ', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 5, name: 'オリアナ', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 6, name: 'ナミ', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 7, name: 'ミス', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 8, name: 'スレッシュ', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 9, name: 'シンドラ', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 10, name: 'ラックス', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 11, name: 'スウェイン', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 12, name: 'インヤスオ', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 13, name: 'オーン', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 14, name: 'ノクターン', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 15, name: 'ヌヌ', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 16, name: 'ヌートダル', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 17, name: 'ルル', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 18, name: 'ルシアン', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 19, name: 'ランブル', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 20, name: 'ルブラン', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 21, name: 'ライズ', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 22, name: 'ズイラ', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 23, name: 'ラムス', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 24, name: 'スウェン', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 25, name: 'ヴェイン', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 26, name: 'インク', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 27, name: 'クイーン', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 28, name: 'インバリアル', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 29, name: 'ルフ', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  { id: 30, name: 'フィオラ', imageUrl: '', soundUrl: '', genre: 'チャンピオン' },
  // しりとりで使いやすい一般的な単語も追加
  { id: 31, name: 'りんご', imageUrl: '', soundUrl: '', genre: '食べ物' },
  { id: 32, name: 'ごりら', imageUrl: '', soundUrl: '', genre: '動物' },
  { id: 33, name: 'らっぱ', imageUrl: '', soundUrl: '', genre: '楽器' },
  { id: 34, name: 'ぱんだ', imageUrl: '', soundUrl: '', genre: '動物' },
  { id: 35, name: 'だいこん', imageUrl: '', soundUrl: '', genre: '野菜' },
  { id: 36, name: 'こんにゃく', imageUrl: '', soundUrl: '', genre: '食べ物' },
  { id: 37, name: 'くじら', imageUrl: '', soundUrl: '', genre: '動物' },
  { id: 38, name: 'らいおん', imageUrl: '', soundUrl: '', genre: '動物' },
  { id: 39, name: 'のり', imageUrl: '', soundUrl: '', genre: '食べ物' },
  { id: 40, name: 'りす', imageUrl: '', soundUrl: '', genre: '動物' },
  { id: 41, name: 'すいか', imageUrl: '', soundUrl: '', genre: '果物' },
  { id: 42, name: 'かめ', imageUrl: '', soundUrl: '', genre: '動物' },
  { id: 43, name: 'めがね', imageUrl: '', soundUrl: '', genre: '道具' },
  { id: 44, name: 'ねこ', imageUrl: '', soundUrl: '', genre: '動物' },
  { id: 45, name: 'こま', imageUrl: '', soundUrl: '', genre: 'おもちゃ' },
  { id: 46, name: 'まくら', imageUrl: '', soundUrl: '', genre: '寝具' },
  { id: 47, name: 'らーめん', imageUrl: '', soundUrl: '', genre: '食べ物' },
  { id: 48, name: 'めんたいこ', imageUrl: '', soundUrl: '', genre: '食べ物' },
  { id: 49, name: 'こーひー', imageUrl: '', soundUrl: '', genre: '飲み物' },
  { id: 50, name: 'ひつじ', imageUrl: '', soundUrl: '', genre: '動物' },
];

export class MockWordRepository {
  private words: Word[] = [];

  constructor() {
    // 「ん」で終わる単語は除外してしりとりに適した単語のみを保持
    this.words = mockWordsData
      .filter(word => !word.name.endsWith('ん'))
      .map(word => new Word(
        word.id,
        word.name,
        word.imageUrl,
        word.soundUrl,
        word.genre
      ));
  }

  async getAllWords(): Promise<Word[]> {
    // 非同期処理をシミュレート
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.words);
      }, 500);
    });
  }

  async getWordByName(name: string): Promise<Word | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const word = this.words.find(w => w.name === name);
        resolve(word || null);
      }, 100);
    });
  }

  async getWordsByStartingChar(char: string): Promise<Word[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredWords = this.words.filter(w => w.name.charAt(0) === char);
        resolve(filteredWords);
      }, 200);
    });
  }

  async getWordsByGenre(genre: string): Promise<Word[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredWords = this.words.filter(w => w.genre === genre);
        resolve(filteredWords);
      }, 200);
    });
  }
}

export const mockWordRepository = new MockWordRepository();

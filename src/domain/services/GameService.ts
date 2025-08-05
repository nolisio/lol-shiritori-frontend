// ゲーム状態を管理するドメインサービス
export class GameService {
  
  /**
   * 新しいゲームを開始
   */
  static createNewGame(): {
    words: string[];
    isGameStarted: boolean;
    isGameOver: boolean;
  } {
    return {
      words: [],
      isGameStarted: false,
      isGameOver: false
    };
  }

  /**
   * 単語を追加してゲーム状態を更新
   */
  static addWord(
    currentWords: string[], 
    newWord: string, 
    isGameOver: boolean = false
  ): {
    words: string[];
    isGameStarted: boolean;
    isGameOver: boolean;
  } {
    return {
      words: [...currentWords, newWord],
      isGameStarted: true,
      isGameOver: isGameOver
    };
  }

  /**
   * ゲームをリセット
   */
  static resetGame(): {
    words: string[];
    isGameStarted: boolean;
    isGameOver: boolean;
  } {
    return this.createNewGame();
  }

  /**
   * ゲームの統計情報を取得
   */
  static getGameStats(words: string[]): {
    totalWords: number;
    uniqueStartingChars: number;
    averageWordLength: number;
  } {
    const totalWords = words.length;
    const startingChars = new Set(words.map(word => word.charAt(0)));
    const averageLength = totalWords > 0 
      ? words.reduce((sum, word) => sum + word.length, 0) / totalWords 
      : 0;

    return {
      totalWords,
      uniqueStartingChars: startingChars.size,
      averageWordLength: Math.round(averageLength * 10) / 10
    };
  }

  /**
   * ゲームが継続可能かチェック
   */
  static canContinueGame(words: string[]): boolean {
    if (words.length === 0) return true;
    
    const lastWord = words[words.length - 1];
    return !lastWord.endsWith('ん');
  }
}

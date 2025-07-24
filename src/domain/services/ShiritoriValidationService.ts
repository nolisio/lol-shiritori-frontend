// しりとりの検証ルールを管理するドメインサービス
export class ShiritoriValidationService {
  
  /**
   * 文字を正規化（濁点・半濁点を統一）
   */
  static normalizeCharacter(char: string): string {
    const normalizationMap: { [key: string]: string } = {
      'が': 'か', 'ぎ': 'き', 'ぐ': 'く', 'げ': 'け', 'ご': 'こ',
      'ざ': 'さ', 'じ': 'し', 'ず': 'す', 'ぜ': 'せ', 'ぞ': 'そ',
      'だ': 'た', 'ぢ': 'ち', 'づ': 'つ', 'で': 'て', 'ど': 'と',
      'ば': 'は', 'び': 'ひ', 'ぶ': 'ふ', 'べ': 'へ', 'ぼ': 'ほ',
      'ぱ': 'は', 'ぴ': 'ひ', 'ぷ': 'ふ', 'ぺ': 'へ', 'ぽ': 'ほ',
      'ガ': 'カ', 'ギ': 'キ', 'グ': 'ク', 'ゲ': 'ケ', 'ゴ': 'コ',
      'ザ': 'サ', 'ジ': 'シ', 'ズ': 'ス', 'ゼ': 'セ', 'ゾ': 'ソ',
      'ダ': 'タ', 'ヂ': 'チ', 'ヅ': 'ツ', 'デ': 'テ', 'ド': 'ト',
      'バ': 'ハ', 'ビ': 'ヒ', 'ブ': 'フ', 'ベ': 'ヘ', 'ボ': 'ホ',
      'パ': 'ハ', 'ピ': 'ヒ', 'プ': 'フ', 'ペ': 'ヘ', 'ポ': 'ホ'
    };
    return normalizationMap[char] || char;
  }

  /**
   * 基本的な文字列の検証（空文字・文字種・長さ）
   */
  static validateBasicFormat(word: string): string | null {
    if (!word || word.trim().length === 0) {
      return '単語を入力してください';
    }

    // ひらがな・カタカナのチェック
    const validChars = /^[あ-んア-ン]+$/;
    if (!validChars.test(word)) {
      return 'ひらがなまたはカタカナで入力してください';
    }

    if (word.length > 20) {
      return '20文字以内で入力してください';
    }

    return null;
  }

  /**
   * 「ん」で終わる単語かチェック（ゲームオーバー条件）
   */
  static isGameOverWord(word: string): boolean {
    return word.endsWith('ん');
  }

  /**
   * 重複チェック
   */
  static isDuplicateWord(word: string, usedWords: string[]): boolean {
    return usedWords.includes(word);
  }

  /**
   * しりとりルールの検証（前の単語の最後の文字と次の単語の最初の文字が一致するか）
   */
  static validateShiritoriRule(currentWord: string, previousWord: string): boolean {
    if (!previousWord) {
      return true; // 最初の単語の場合は常にtrue
    }

    const lastChar = previousWord.slice(-1);
    const firstChar = currentWord.charAt(0);
    
    return this.normalizeCharacter(lastChar) === this.normalizeCharacter(firstChar);
  }

  /**
   * 単語の総合検証
   */
  static validateWord(word: string, usedWords: string[]): { isValid: boolean; error: string | null; isGameOver: boolean } {
    // 基本フォーマットチェック
    const formatError = this.validateBasicFormat(word);
    if (formatError) {
      return { isValid: false, error: formatError, isGameOver: false };
    }

    // ゲームオーバーチェック
    if (this.isGameOverWord(word)) {
      return { isValid: false, error: 'GAME_OVER', isGameOver: true };
    }

    // 重複チェック
    if (this.isDuplicateWord(word, usedWords)) {
      return { isValid: false, error: 'その単語は既に使用されています', isGameOver: false };
    }

    // しりとりルールチェック（前の単語がある場合）
    if (usedWords.length > 0) {
      const previousWord = usedWords[usedWords.length - 1];
      if (!this.validateShiritoriRule(word, previousWord)) {
        const expectedChar = previousWord.slice(-1);
        return { 
          isValid: false, 
          error: `「${expectedChar}」から始まる単語を入力してください`, 
          isGameOver: false 
        };
      }
    }

    return { isValid: true, error: null, isGameOver: false };
  }

  /**
   * 次に入力すべき文字を取得
   */
  static getNextChar(usedWords: string[]): string {
    if (usedWords.length === 0) return '';
    const lastWord = usedWords[usedWords.length - 1];
    return lastWord.slice(-1);
  }
}

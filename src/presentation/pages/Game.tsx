import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Game: React.FC = () => {
  const navigate = useNavigate();
  const [words, setWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState('');
  const [error, setError] = useState('');
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const validateWord = (word: string): string | null => {
    if (!word || word.trim().length === 0) {
      return '単語を入力してください';
    }

    // ひらがな・カタカナのチェック
    const validChars = /^[あ-んア-ン]+$/;
    if (!validChars.test(word)) {
      return 'ひらがなまたはカタカナで入力してください';
    }

    // 「ん」で終わる単語のチェック（ゲームオーバー）
    if (word.endsWith('ん')) {
      return 'GAME_OVER';
    }

    // 既に使用済みの単語チェック
    if (words.includes(word)) {
      return 'その単語は既に使用されています';
    }

    // しりとりルールチェック（2個目以降）
    if (words.length > 0) {
      const lastWord = words[words.length - 1];
      const lastChar = lastWord.slice(-1);
      const firstChar = word.charAt(0);
      
      // 濁点・半濁点の正規化
      const normalizeChar = (char: string): string => {
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
      };

      if (normalizeChar(lastChar) !== normalizeChar(firstChar)) {
        return `「${lastChar}」から始まる単語を入力してください`;
      }
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validationError = validateWord(currentWord);
    if (validationError) {
      if (validationError === 'GAME_OVER') {
        setIsGameOver(true);
        setWords([...words, currentWord]);
        
        // 3秒後にホームに戻る
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setError(validationError);
      }
      return;
    }

    setWords([...words, currentWord]);
    setCurrentWord('');
    setIsGameStarted(true);
  };

  const handleReset = () => {
    setWords([]);
    setCurrentWord('');
    setError('');
    setIsGameStarted(false);
    setIsGameOver(false);
  };

  const getNextChar = (): string => {
    if (words.length === 0) return '';
    const lastWord = words[words.length - 1];
    return lastWord.slice(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            しりとりゲーム
          </h1>

          {/* ゲーム状態表示 */}
          {isGameStarted && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">
                使用済みの単語 ({words.length}個)
              </h2>
              <div className="flex flex-wrap gap-2">
                {words.map((word, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 次の文字のヒント */}
          {getNextChar() && (
            <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
              <p className="text-yellow-800">
                💡 次は「{getNextChar()}」から始まる単語を入力してください
              </p>
            </div>
          )}

          {/* 単語入力フォーム */}
          {!isGameOver && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={currentWord}
                  onChange={(e) => setCurrentWord(e.target.value)}
                  placeholder={
                    words.length === 0
                      ? "最初の単語を入力してください"
                      : `「${getNextChar()}」から始まる単語を入力してください`
                  }
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    error ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {error && (
                  <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
              </div>
              
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  単語を追加
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  リセット
                </button>
              </div>
            </form>
          )}

          {/* ゲームオーバー表示 */}
          {isGameOver && (
            <div className="mt-6 p-6 bg-red-50 rounded-lg border-2 border-red-200 text-center">
              <div className="text-4xl mb-4">💥</div>
              <h2 className="text-2xl font-bold text-red-800 mb-2">
                ゲームオーバー！
              </h2>
              <p className="text-red-700 mb-4">
                「{words[words.length - 1]}」は「ん」で終わるため、ゲーム終了です
              </p>
              <p className="text-sm text-red-600 mb-4">
                最終スコア: {words.length}個の単語
              </p>
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
                <span className="text-red-600">3秒後にホームに戻ります...</span>
              </div>
            </div>
          )}

          {/* ルール説明 */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">ルール</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 前の単語の最後の文字から始まる単語を入力</li>
              <li>• 「ん」で終わる単語は使用不可</li>
              <li>• 同じ単語は使用不可</li>
              <li>• ひらがな・カタカナで入力</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
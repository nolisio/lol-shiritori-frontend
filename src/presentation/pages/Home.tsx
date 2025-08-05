import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/game');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          しりとりゲーム
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          一人でしりとりを楽しもう！
        </p>
        
        <div className="space-y-4">
          <button
            onClick={handleStartGame}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            ゲームを始める
          </button>
          
          <button
            onClick={() => navigate('/words')}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            単語一覧を見る
          </button>
        </div>
        
        <div className="mt-8 text-left">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">遊び方</h2>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• 前の単語の最後の文字から始まる単語を入力</li>
            <li>• 「ん」で終わる単語は使用できません</li>
            <li>• 同じ単語は一度しか使用できません</li>
            <li>• ひらがな・カタカナで入力してください</li>
          </ul>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">例</h3>
          <div className="text-sm text-blue-700">
            りんご → ごりら → らくだ → だるま
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
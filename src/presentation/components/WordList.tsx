import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getWordsUseCase } from '../../application/use-cases/GetWordsUseCase'
import { Word } from '../../domain/entities/Word'

export const WordList: React.FC = () => {
  const navigate = useNavigate()
  const [words, setWords] = useState<Word[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedGenre, setSelectedGenre] = useState<string>('全て')

  useEffect(() => {
    const fetchWords = async () => {
      try {
        setLoading(true)
        setError(null)
        const wordsData = await getWordsUseCase()
        setWords(wordsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : '単語の取得に失敗しました')
      } finally {
        setLoading(false)
      }
    }

    fetchWords()
  }, [])

  // ジャンル一覧を取得
  const genres = ['全て', ...Array.from(new Set(words.map(word => word.genre)))]

  // フィルタリングされた単語
  const filteredWords = selectedGenre === '全て' 
    ? words 
    : words.filter(word => word.genre === selectedGenre)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">単語を読み込み中...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">エラー: {error}</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              ホームに戻る
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">単語一覧</h1>
              <p className="text-gray-600">しりとりで使用できる登録済みの単語</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="mt-4 md:mt-0 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              ホームに戻る
            </button>
          </div>
          
          {/* ジャンルフィルター */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ジャンルで絞り込み:
            </label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          {/* 統計情報 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">総単語数</h3>
              <p className="text-2xl font-bold text-blue-600">{words.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">表示中</h3>
              <p className="text-2xl font-bold text-green-600">{filteredWords.length}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800">ジャンル数</h3>
              <p className="text-2xl font-bold text-purple-600">{genres.length - 1}</p>
            </div>
          </div>
          
          {/* 単語グリッド */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
            {filteredWords.map(word => (
              <div 
                key={word.id}
                className="p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800 text-lg mb-1">{word.name}</span>
                  <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded self-start">
                    {word.genre}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredWords.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">選択されたジャンルに該当する単語がありません。</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getWordsUseCase } from '../../application/use-cases/GetWordsUseCase'
import { Word } from '../../domain/entities/Word'

export const WordList: React.FC = () => {
  const navigate = useNavigate()
  const [words, setWords] = useState<Word[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">読み込み中...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">エラー: {error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">単語一覧</h1>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              ホームに戻る
            </button>
          </div>
          
          <div className="mb-4 text-sm text-gray-600">
            全 {words.length} 件の単語
          </div>
          
          <ul className="space-y-2 max-h-96 overflow-y-auto">
            {words.map(word => (
              <li 
                key={word.id}
                className="p-3 bg-gray-50 rounded border hover:bg-gray-100 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">{word.name}</span>
                  <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">
                    {word.genre}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}


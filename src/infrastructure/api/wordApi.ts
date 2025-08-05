// フロントエンドではPrismaを使用しないため、モック実装

interface WordData {
  id: number;
  name: string;
  imageUrl: string;
  soundUrl: string;
  genre: string;
}

export const getAllWords = async (): Promise<WordData[]> => {
  // モックデータを返す
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'りんご', imageUrl: '', soundUrl: '', genre: '食べ物' },
        { id: 2, name: 'ごりら', imageUrl: '', soundUrl: '', genre: '動物' },
        { id: 3, name: 'らっぱ', imageUrl: '', soundUrl: '', genre: '楽器' },
      ])
    }, 100)
  })
}

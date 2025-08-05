import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/game');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f3f4f6', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
        padding: '2rem', 
        maxWidth: '28rem', 
        width: '100%', 
        textAlign: 'center' 
      }}>
        <h1 style={{ 
          fontSize: '2.25rem', 
          fontWeight: 'bold', 
          color: '#1f2937', 
          marginBottom: '1.5rem' 
        }}>
          しりとりゲーム
        </h1>
        <p style={{ 
          fontSize: '1.125rem', 
          color: '#6b7280', 
          marginBottom: '2rem' 
        }}>
          一人でしりとりを楽しもう！
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button
            onClick={handleStartGame}
            style={{ 
              width: '100%', 
              padding: '0.75rem 1.5rem', 
              backgroundColor: '#2563eb', 
              color: 'white', 
              borderRadius: '8px', 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              border: 'none', 
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          >
            ゲームを始める
          </button>
          
          <button
            onClick={() => navigate('/words')}
            style={{ 
              width: '100%', 
              padding: '0.75rem 1.5rem', 
              backgroundColor: '#059669', 
              color: 'white', 
              borderRadius: '8px', 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              border: 'none', 
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#047857'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#059669'}
          >
            単語一覧を見る
          </button>
        </div>
        
        <div style={{ marginTop: '2rem', textAlign: 'left' }}>
          <h2 style={{ 
            fontSize: '1.125rem', 
            fontWeight: '600', 
            color: '#1f2937', 
            marginBottom: '0.75rem' 
          }}>遊び方</h2>
          <ul style={{ 
            fontSize: '0.875rem', 
            color: '#6b7280', 
            listStyle: 'none', 
            padding: 0 
          }}>
            <li style={{ marginBottom: '0.5rem' }}>• 前の単語の最後の文字から始まる単語を入力</li>
            <li style={{ marginBottom: '0.5rem' }}>• 「ん」で終わる単語は使用できません</li>
            <li style={{ marginBottom: '0.5rem' }}>• 同じ単語は一度しか使用できません</li>
            <li style={{ marginBottom: '0.5rem' }}>• ひらがな・カタカナで入力してください</li>
          </ul>
        </div>
        
        <div style={{ 
          marginTop: '1.5rem', 
          padding: '1rem', 
          backgroundColor: '#dbeafe', 
          borderRadius: '8px' 
        }}>
          <h3 style={{ 
            fontWeight: '600', 
            color: '#1e40af', 
            marginBottom: '0.5rem' 
          }}>例</h3>
          <div style={{ 
            fontSize: '0.875rem', 
            color: '#1e40af' 
          }}>
            りんご → ごりら → らくだ → だるま
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
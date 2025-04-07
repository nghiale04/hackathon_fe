import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/assessmentHistory.css';
import Header from '../components/Header';
import Chatbot from '../components/Chatbot';

function AssessmentHistory() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const user = localStorage.getItem('user');
        const username = JSON.parse(user).email;
        const response = await axios.get('https://be.nguyenhoangan.site/api/assessment-history', {
          params: { username: username }
        });
        setHistory(response.data.results);
      } catch (err) {
        setError('Failed to fetch assessment history');
      }
    };

    fetchHistory();
  }, []);

  return (
    <>
      <Header />
      <div className="assessment-history">
        <h2>Lịch sử Bài Đánh Giá</h2>
        {error ? (
          <p>{error}</p>
        ) : (
          <ul className="result-list">
            {history.map((result) => (
              <li key={result.resultId} className="result-card">
                <div className="result-content">
                  <h3>Kết quả đánh giá lần {result.resultId}</h3>
                  <p>{result.resultContent}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Chatbot />
    </>
  );
}

export default AssessmentHistory; 
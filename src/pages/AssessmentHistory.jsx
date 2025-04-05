import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/assessmentHistory.css';
import Header from '../components/Header';

function AssessmentHistory() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const user = localStorage.getItem('user');
        const username = JSON.parse(user).email;
        const response = await axios.get('http://localhost:8080/api/assessment-history', {
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
                  <p>{JSON.parse(result.resultContent).candidates[0].content.parts[0].text}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default AssessmentHistory; 
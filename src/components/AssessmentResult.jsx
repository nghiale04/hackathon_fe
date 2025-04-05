import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import "../styles/assessment.css";
import axios from "axios";
import Header from "./Header";
import Chatbot from "./Chatbot";

const AssessmentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy dữ liệu truyền từ trang trước
  const { answers, category, questions, totalScore, type } =
    location.state || {};

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gửi dữ liệu khi component mount
  useEffect(() => {
    if (!type || totalScore === undefined) {
      setError("Thiếu dữ liệu đánh giá. Vui lòng quay lại và thử lại.");
      setLoading(false);
      return;
    }

    const sendData = async () => {
      try {
        const user = localStorage.getItem("user");
        if (user) {
          const username = JSON.parse(user).email;
          const response = await axios.post(
            "http://localhost:8080/api/qna/ask",
            {
              username,
              type,
              totalScore,
            }
          );
          const analysis = response.data.candidates[0].content.parts[0].text;

          setAnalysis(analysis);
          setLoading(false);
        } else {
          const response = await axios.post(
            "http://localhost:8080/api/qna/ask",
            {
              type,
              totalScore,
            }
          );
          const analysis = response.data.candidates[0].content.parts[0].text;

          setAnalysis(analysis);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error sending data:", err);
        setError("Có lỗi xảy ra khi gửi dữ liệu. Vui lòng thử lại.");
        setLoading(false);
      }
    };

    sendData();
  }, [type, totalScore]);

  const handleReset = () => {
    navigate(-1); // Quay lại trang trước để làm lại
  };

  if (loading) {
    return (
      <>
        <Header />
        <div
          className="results-container"
          style={{
            paddingTop: "120px",
          }}
        >
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Đang phân tích kết quả...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div
          className="results-container"
          style={{
            paddingTop: "120px",
          }}
        >
          <div className="error-message">
            <p>{error}</p>
            <button className="action-button primary" onClick={handleReset}>
              <RefreshCw className="button-icon" />
              Thử lại
            </button>
          </div>
        </div>
      </>
    );
  }

  const lines = analysis.split("\n");

  return (
    <>
      <Header />
      <div
        className="results-container"
        style={{
          paddingTop: "120px",
        }}
      >
        <h2 className="results-title">Kết quả đánh giá</h2>

        <div className="results-content">
          <p>
            <strong>Chủ đề:</strong> {category?.title}
          </p>
          <p>
            <strong>Tổng điểm:</strong> {totalScore}
          </p>
          <p>
            <strong>Loại đánh giá:</strong> {type}
          </p>
          <p>
            <strong>Phân tích AI:</strong>{" "}
            {lines.map((line, index) => <p key={index}>{line}</p>) ||
              "Không có phân tích."}
          </p>
        </div>

        <div className="results-actions">
          <button className="action-button primary" onClick={handleReset}>
            <RefreshCw className="button-icon" />
            Làm lại đánh giá
          </button>
        </div>
      </div>
      <Chatbot />
    </>
  );
};

export default AssessmentResult;

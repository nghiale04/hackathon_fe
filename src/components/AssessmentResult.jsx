import { useState, useEffect } from "react";
import { CheckCircle, RefreshCw, ArrowRight } from "lucide-react";
import "../styles/assessment.css";

const AssessmentResult = ({ answers, category, onReset, totalScore }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const analyzeResults = async () => {
      try {
        // Format answers as JSON
        const formattedAnswers = {
          category: category.id,
          timestamp: new Date().toISOString(),
          answers: answers,
        };

        // TODO: Replace with actual AI API call
        // This is a mock implementation
        const response = await mockAIAnalysis(formattedAnswers);
        setAnalysis(response);
        console.log(answers);
      } catch (err) {
        setError("Có lỗi xảy ra khi phân tích kết quả. Vui lòng thử lại.");
        console.error("Analysis error:", err);
      } finally {
        setLoading(false);
      }
    };

    analyzeResults();
  }, [answers, category]);

  const mockAIAnalysis = async (data) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock analysis results
    return {
      summary:
        "Dựa trên câu trả lời của bạn, chúng tôi nhận thấy bạn đang gặp một số vấn đề về sức khỏe tâm lý. Tuy nhiên, đây là tình trạng có thể cải thiện được.",
      recommendations: [
        "Thực hành các bài tập thở và thiền định hàng ngày",
        "Duy trì lối sống lành mạnh và tập thể dục thường xuyên",
        "Tìm kiếm sự hỗ trợ từ người thân và bạn bè",
        "Xem xét việc tham khảo ý kiến chuyên gia tâm lý",
      ],
      severity: "moderate",
      nextSteps: [
        "Đặt lịch hẹn với chuyên gia tâm lý",
        "Tham gia các hoạt động cộng đồng",
        "Theo dõi tình trạng sức khỏe tâm lý hàng tuần",
      ],
    };
  };

  if (loading) {
    return (
      <div className="results-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Đang phân tích kết quả...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="results-container">
        <div className="error-message">
          <p>{error}</p>
          <button className="action-button primary" onClick={onReset}>
            <RefreshCw className="button-icon" />
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="results-container">
      <h2 className="results-title">Kết quả đánh giá</h2>

      <div className="results-content">
        <div className="results-summary">
          <h3>Tổng quan</h3>
          <p>{analysis.summary}</p>
        </div>

        <div className="results-recommendations">
          <h3>Đề xuất</h3>
          <ul>
            {analysis.recommendations.map((rec, index) => (
              <li key={index}>
                <CheckCircle className="check-icon" />
                {rec}
              </li>
            ))}
          </ul>
        </div>

        <div className="results-next-steps">
          <h3>Bước tiếp theo</h3>
          <ul>
            {analysis.nextSteps.map((step, index) => (
              <li key={index}>
                <ArrowRight className="arrow-icon" />
                {step}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="results-actions">
        <button className="action-button primary" onClick={onReset}>
          <RefreshCw className="button-icon" />
          Làm lại đánh giá
        </button>
      </div>
    </div>
  );
};

export default AssessmentResult;

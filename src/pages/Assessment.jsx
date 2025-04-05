import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  CheckCircle,
  ArrowRight,
  RefreshCw,
  Home,
  Users,
  Heart,
  Book,
  Globe,
  MoreHorizontal,
  ChevronLeft,
} from "lucide-react";
import AssessmentResult from "../components/AssessmentResult";
import "../styles/assessment.css";

// Categories for mental health assessment
const categories = [
  {
    id: "love",
    title: "Tình yêu",
    icon: Heart,
    description: "Đánh giá về các vấn đề tình cảm và mối quan hệ lãng mạn",
    color: "#FF9F1C",
  },
  {
    id: "family",
    title: "Gia đình",
    icon: Home,
    description:
      "Đánh giá về các vấn đề liên quan đến gia đình và mối quan hệ trong nhà",
    color: "#FF6B6B",
  },
  {
    id: "friend",
    title: "Bạn bè",
    icon: Users,
    description: "Đánh giá về các mối quan hệ bạn bè và tương tác xã hội",
    color: "#4ECDC4",
  },
  {
    id: "study",
    title: "Học tập",
    icon: Book,
    description: "Đánh giá về áp lực học tập và định hướng tương lai",
    color: "#2EC4B6",
  },
  {
    id: "social",
    title: "Mạng xã hội",
    icon: Globe,
    description: "Đánh giá về ảnh hưởng của mạng xã hội đến cuộc sống",
    color: "#E71D36",
  },
  {
    id: "other",
    title: "Khác",
    icon: MoreHorizontal,
    description: "Đánh giá về các vấn đề khác trong cuộc sống",
    color: "#6C63FF",
  },
];

// Results based on category and answers
const results = {
  family: {
    a: {
      title: "Mối quan hệ gia đình tốt",
      description:
        "Bạn có mối quan hệ gia đình rất tốt. Hãy tiếp tục duy trì và phát triển các mối quan hệ này.",
      recommendations: [
        "Dành thời gian chất lượng cho gia đình",
        "Tiếp tục chia sẻ và lắng nghe",
        "Tổ chức các hoạt động gia đình thường xuyên",
      ],
    },
    b: {
      title: "Mối quan hệ gia đình khá tốt",
      description:
        "Mối quan hệ gia đình của bạn khá ổn, nhưng có thể cải thiện thêm.",
      recommendations: [
        "Cải thiện giao tiếp trong gia đình",
        "Giải quyết các xung đột nhỏ kịp thời",
        "Tăng cường các hoạt động gia đình",
      ],
    },
    c: {
      title: "Cần cải thiện mối quan hệ gia đình",
      description: "Bạn đang gặp một số vấn đề trong mối quan hệ gia đình.",
      recommendations: [
        "Tìm hiểu nguyên nhân của mâu thuẫn",
        "Học cách giao tiếp hiệu quả",
        "Tìm kiếm sự giúp đỡ từ chuyên gia nếu cần",
      ],
    },
    d: {
      title: "Mối quan hệ gia đình cần được quan tâm",
      description:
        "Mối quan hệ gia đình của bạn đang gặp nhiều vấn đề nghiêm trọng.",
      recommendations: [
        "Tìm kiếm sự giúp đỡ từ chuyên gia tâm lý",
        "Tham gia các buổi tư vấn gia đình",
        "Học cách đặt ranh giới lành mạnh",
      ],
    },
  },
  // ... Similar result structures for other categories
};

function Assessment() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [answerPoints, setAnswerPoints] = useState({});
  const [type, setType] = useState(null);
  const navigate = useNavigate();

  const fetchQuestions = async (categoryId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8080/api/questions`, {
        params: {
          type: categoryId,
        },
      });

      // Transform the API response data structure
      const transformedQuestions = response.data.map((item) => ({
        id: item.questions.questionId,
        question: item.questions.questionContent,
        options: item.answers.map((answer) => ({
          id: answer.answerId.toString(),
          text: answer.answerContent,
          emoji: getEmojiForAnswer(answer.answerPoint), // Helper function to assign emojis based on answer point
          answerPoint: answer.answerPoint,
        })),
      }));

      setQuestions(transformedQuestions);
      console.log("Transformed questions:", transformedQuestions);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch questions");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to assign emojis based on answer point
  const getEmojiForAnswer = (point) => {
    const emojis = {
      1: "😊", // Rất đồng ý
      2: "🙂", // Đồng ý
      3: "😐", // Không chắc chắn
      4: "😕", // Không đồng ý
      5: "😔", // Rất không đồng ý
    };
    return emojis[point] || "🤔";
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    fetchQuestions(category.id);
    setType(category.id);
  };

  const handleAnswer = (questionId, optionId, answerPoint) => {
    // Lưu điểm số của câu trả lời cũ (nếu có) để trừ đi
    const oldPoint = answerPoints[questionId] || 0;

    // Cập nhật answers như cũ
    setAnswers({
      ...answers,
      [questionId]: optionId,
    });

    // Cập nhật điểm số cho câu hỏi hiện tại
    setAnswerPoints({
      ...answerPoints,
      [questionId]: answerPoint,
    });

    // Cập nhật tổng điểm: trừ điểm cũ (nếu có) và cộng điểm mới
    setTotalScore((prevScore) => prevScore - oldPoint + answerPoint);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      // Extract only serializable properties from selectedCategory
      const { id, title, description, color } = selectedCategory;
      navigate("/result", {
        // Navigate to AssessmentResult page
        state: {
          answers,
          category: { id, title, description, color }, // Pass only serializable data
          questions,
          totalScore,
          type,
        },
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetAssessment = () => {
    setSelectedCategory(null);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setQuestions([]);
    setTotalScore(0);
    setAnswerPoints({});
  };

  const isQuestionAnswered = (questionId) => {
    return answers[questionId] !== undefined;
  };

  const progressPercentage = questions.length
    ? ((currentQuestion + 1) / questions.length) * 100
    : 0;

  return (
    <main className="assessment-main">
      <div className="assessment-card">
        {!selectedCategory ? (
          <div className="category-selection">
            <h2>Chọn lĩnh vực bạn muốn đánh giá</h2>
            <div className="category-grid">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.id}
                    className="category-card"
                    onClick={() => handleCategorySelect(category)}
                    style={{ backgroundColor: category.color }}
                  >
                    <Icon className="category-icon" />
                    <h3>{category.title}</h3>
                    <p>{category.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : !showResults ? (
          <>
            {isLoading ? (
              <div className="loading">Đang tải câu hỏi...</div>
            ) : error ? (
              <div className="error">
                <p>{error}</p>
                <button
                  className="action-button primary"
                  onClick={() => fetchQuestions(selectedCategory.id)}
                >
                  Thử lại
                </button>
              </div>
            ) : questions.length > 0 ? (
              <>
                <div className="assessment-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <div className="progress-text">
                    Câu hỏi {currentQuestion + 1} trên {questions.length}
                  </div>
                </div>

                <div className="question-container">
                  <button
                    className="back-button"
                    onClick={() => setSelectedCategory(null)}
                  >
                    <ChevronLeft className="back-icon" />
                    Quay lại
                  </button>

                  <h2 className="question-text">
                    {questions[currentQuestion].question}
                  </h2>

                  <div className="options-container">
                    {questions[currentQuestion].options.map((option) => (
                      <div
                        key={option.id}
                        className={`option ${
                          answers[questions[currentQuestion].id] === option.id
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          handleAnswer(
                            questions[currentQuestion].id,
                            option.id,
                            option.answerPoint
                          )
                        }
                      >
                        <div className="option-emoji">{option.emoji}</div>
                        <div className="option-text">{option.text}</div>
                        {answers[questions[currentQuestion].id] ===
                          option.id && <CheckCircle className="check-icon" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="assessment-actions">
                  <button
                    className="action-button secondary"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                  >
                    Quay về câu trước
                  </button>
                  <button
                    className="action-button primary"
                    onClick={handleNext}
                    disabled={
                      !isQuestionAnswered(questions[currentQuestion].id)
                    }
                  >
                    {currentQuestion < questions.length - 1
                      ? "Tiếp theo"
                      : "Xem kết quả"}
                    {currentQuestion < questions.length - 1 && (
                      <ArrowRight className="button-icon" />
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="no-questions">
                <p>Không tìm thấy câu hỏi cho lĩnh vực này</p>
                <button
                  className="action-button primary"
                  onClick={() => setSelectedCategory(null)}
                >
                  Chọn lĩnh vực khác
                </button>
              </div>
            )}
          </>
        ) : (
          <Link
            to="/result"
            element={
              <AssessmentResult
                answers={answers}
                category={selectedCategory}
                questions={questions}
                totalScore={totalScore}
                type={type}
                onReset={resetAssessment}
              />
            }
          />
        )}
      </div>
    </main>
  );
}

export default Assessment;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
} from "lucide-react";
import "../styles/assessment.css";

// Categories for mental health assessment
const categories = [
  {
    id: "family",
    title: "Gia đình",
    icon: Home,
    description:
      "Đánh giá về các vấn đề liên quan đến gia đình và mối quan hệ trong nhà",
    color: "#FF6B6B",
  },
  {
    id: "friends",
    title: "Bạn bè",
    icon: Users,
    description: "Đánh giá về các mối quan hệ bạn bè và tương tác xã hội",
    color: "#4ECDC4",
  },
  {
    id: "relationship",
    title: "Tình cảm",
    icon: Heart,
    description: "Đánh giá về các vấn đề tình cảm và mối quan hệ lãng mạn",
    color: "#FF9F1C",
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

// Questions for each category
const categoryQuestions = {
  family: [
    {
      id: 1,
      question:
        "Bạn cảm thấy thế nào về mối quan hệ với các thành viên trong gia đình?",
      options: [
        { id: "a", text: "Rất tốt, luôn được yêu thương và hỗ trợ" },
        { id: "b", text: "Khá tốt, đôi khi có xung đột nhỏ" },
        { id: "c", text: "Không tốt lắm, thường xuyên có mâu thuẫn" },
        { id: "d", text: "Rất tệ, luôn cảm thấy căng thẳng và áp lực" },
      ],
    },
    {
      id: 2,
      question: "Bạn có thường xuyên chia sẻ cảm xúc với gia đình không?",
      options: [
        { id: "a", text: "Luôn chia sẻ mọi điều" },
        { id: "b", text: "Thỉnh thoảng chia sẻ" },
        { id: "c", text: "Hiếm khi chia sẻ" },
        { id: "d", text: "Không bao giờ chia sẻ" },
      ],
    },
  ],
  friends: [
    {
      id: 1,
      question: "Bạn có nhiều bạn bè thân thiết không?",
      options: [
        { id: "a", text: "Có nhiều bạn thân và luôn được hỗ trợ" },
        { id: "b", text: "Có một vài người bạn thân" },
        { id: "c", text: "Có ít bạn bè thân thiết" },
        { id: "d", text: "Không có bạn bè thân thiết" },
      ],
    },
  ],
  relationship: [
    {
      id: 1,
      question: "Bạn có hài lòng với mối quan hệ tình cảm hiện tại không?",
      options: [
        { id: "a", text: "Rất hài lòng và hạnh phúc" },
        { id: "b", text: "Khá hài lòng" },
        { id: "c", text: "Không hài lòng lắm" },
        { id: "d", text: "Rất không hài lòng" },
      ],
    },
  ],
  study: [
    {
      id: 1,
      question: "Bạn có thường xuyên cảm thấy áp lực trong học tập không?",
      options: [
        { id: "a", text: "Hiếm khi, luôn cân bằng tốt" },
        { id: "b", text: "Thỉnh thoảng, nhưng có thể kiểm soát" },
        { id: "c", text: "Thường xuyên, khó kiểm soát" },
        { id: "d", text: "Luôn luôn, rất căng thẳng" },
      ],
    },
  ],
  social: [
    {
      id: 1,
      question: "Mạng xã hội ảnh hưởng thế nào đến cuộc sống của bạn?",
      options: [
        { id: "a", text: "Tích cực, giúp kết nối và học hỏi" },
        { id: "b", text: "Có cả tích cực và tiêu cực" },
        { id: "c", text: "Tiêu cực nhiều hơn tích cực" },
        { id: "d", text: "Rất tiêu cực, ảnh hưởng xấu đến cuộc sống" },
      ],
    },
  ],
  other: [
    {
      id: 1,
      question: "Bạn có thường xuyên cảm thấy lo lắng về tương lai không?",
      options: [
        { id: "a", text: "Hiếm khi, luôn lạc quan" },
        { id: "b", text: "Thỉnh thoảng, nhưng vẫn kiểm soát được" },
        { id: "c", text: "Thường xuyên, khó kiểm soát" },
        { id: "d", text: "Luôn luôn, rất lo lắng" },
      ],
    },
  ],
};

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

function Assessment({ onCompleteAssessment, previousResults }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState(null);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleAnswer = (questionId, optionId) => {
    setAnswers({
      ...answers,
      [questionId]: optionId,
    });
  };

  const handleNext = () => {
    const currentQuestions = categoryQuestions[selectedCategory];
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const calculatedResult = calculateResult();
      setResult(calculatedResult);
      setShowResults(true);

      if (onCompleteAssessment) {
        onCompleteAssessment(calculatedResult);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = () => {
    const currentAnswers = Object.values(answers);
    const counts = { a: 0, b: 0, c: 0, d: 0 };

    currentAnswers.forEach((answer) => {
      counts[answer]++;
    });

    let mostCommon = "a";
    let highestCount = 0;

    Object.entries(counts).forEach(([answer, count]) => {
      if (count > highestCount) {
        highestCount = count;
        mostCommon = answer;
      }
    });

    return results[selectedCategory][mostCommon];
  };

  const resetAssessment = () => {
    setSelectedCategory(null);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setResult(null);

    if (onCompleteAssessment) {
      onCompleteAssessment(null);
    }
  };

  const isQuestionAnswered = (questionId) => {
    return answers[questionId] !== undefined;
  };

  const progressPercentage = selectedCategory
    ? (
        (Object.keys(answers).length /
          categoryQuestions[selectedCategory].length) *
        100
      ).toFixed(0)
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
                    onClick={() => handleCategorySelect(category.id)}
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
            <div className="assessment-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="progress-text">
                Câu hỏi {currentQuestion + 1} trên{" "}
                {categoryQuestions[selectedCategory].length}
              </div>
            </div>

            <div className="question-container">
              <h2 className="question-text">
                {categoryQuestions[selectedCategory][currentQuestion].question}
              </h2>

              <div className="options-container">
                {categoryQuestions[selectedCategory][
                  currentQuestion
                ].options.map((option) => (
                  <div
                    key={option.id}
                    className={`option ${
                      answers[
                        categoryQuestions[selectedCategory][currentQuestion].id
                      ] === option.id
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      handleAnswer(
                        categoryQuestions[selectedCategory][currentQuestion].id,
                        option.id
                      )
                    }
                  >
                    <div className="option-checkbox">
                      {answers[
                        categoryQuestions[selectedCategory][currentQuestion].id
                      ] === option.id && <CheckCircle className="check-icon" />}
                    </div>
                    <div className="option-text">{option.text}</div>
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
                Quay lại
              </button>
              <button
                className="action-button primary"
                onClick={handleNext}
                disabled={
                  !isQuestionAnswered(
                    categoryQuestions[selectedCategory][currentQuestion].id
                  )
                }
              >
                {currentQuestion <
                categoryQuestions[selectedCategory].length - 1
                  ? "Tiếp theo"
                  : "Xem kết quả"}
                {currentQuestion <
                  categoryQuestions[selectedCategory].length - 1 && (
                  <ArrowRight className="button-icon" />
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="results-container">
            <h2 className="results-title">{result.title}</h2>
            <p className="results-description">{result.description}</p>

            <div className="recommendations-container">
              <h3 className="recommendations-title">Đề xuất</h3>
              <ul className="recommendations-list">
                {result.recommendations.map((recommendation, index) => (
                  <li key={index} className="recommendation-item">
                    {recommendation}
                  </li>
                ))}
              </ul>
            </div>

            <div className="results-actions">
              <button
                className="action-button primary"
                onClick={resetAssessment}
              >
                <RefreshCw className="button-icon" /> Làm lại đánh giá
              </button>
              <Link to="/recommendations" className="action-button secondary">
                Xem đề xuất chi tiết
              </Link>
            </div>

            <div className="results-disclaimer">
              <p>
                Đánh giá này không phải là công cụ chẩn đoán. Nếu bạn đang gặp
                khó khăn nghiêm trọng, hãy tìm kiếm sự giúp đỡ từ chuyên gia tâm
                lý.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Assessment;

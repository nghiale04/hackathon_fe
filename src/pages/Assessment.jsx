import { useState } from "react";
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
    id: "family",
    title: "Gia đình",
    icon: Home,
    description:
      "Đánh giá về các vấn đề liên quan đến gia đình và mối quan hệ trong nhà",
    color: "#FF6B6B",
    questions: [
      {
        id: 1,
        question:
          "Bạn cảm thấy thế nào về mối quan hệ với các thành viên trong gia đình?",
        options: [
          {
            id: "a",
            text: "Rất tốt, luôn được yêu thương và hỗ trợ",
            emoji: "😊",
          },
          { id: "b", text: "Khá tốt, đôi khi có xung đột nhỏ", emoji: "🙂" },
          {
            id: "c",
            text: "Không tốt lắm, thường xuyên có mâu thuẫn",
            emoji: "😔",
          },
          {
            id: "d",
            text: "Rất tệ, luôn cảm thấy căng thẳng và áp lực",
            emoji: "😢",
          },
        ],
      },
      {
        id: 2,
        question: "Bạn có thường xuyên chia sẻ cảm xúc với gia đình không?",
        options: [
          { id: "a", text: "Luôn chia sẻ mọi điều", emoji: "💬" },
          { id: "b", text: "Thỉnh thoảng chia sẻ", emoji: "🗣️" },
          { id: "c", text: "Hiếm khi chia sẻ", emoji: "🤐" },
          { id: "d", text: "Không bao giờ chia sẻ", emoji: "🚫" },
        ],
      },
    ],
  },
  {
    id: "friends",
    title: "Bạn bè",
    icon: Users,
    description: "Đánh giá về các mối quan hệ bạn bè và tương tác xã hội",
    color: "#4ECDC4",
    questions: [
      {
        id: 1,
        question: "Bạn có nhiều bạn bè thân thiết không?",
        options: [
          {
            id: "a",
            text: "Có nhiều bạn thân và luôn được hỗ trợ",
            emoji: "👥",
          },
          { id: "b", text: "Có một vài người bạn thân", emoji: "👫" },
          { id: "c", text: "Có ít bạn bè thân thiết", emoji: "👤" },
          { id: "d", text: "Không có bạn bè thân thiết", emoji: "😔" },
        ],
      },
    ],
  },
  {
    id: "relationship",
    title: "Tình cảm",
    icon: Heart,
    description: "Đánh giá về các vấn đề tình cảm và mối quan hệ lãng mạn",
    color: "#FF9F1C",
    questions: [
      {
        id: 1,
        question: "Bạn có hài lòng với mối quan hệ tình cảm hiện tại không?",
        options: [
          { id: "a", text: "Rất hài lòng và hạnh phúc", emoji: "❤️" },
          { id: "b", text: "Khá hài lòng", emoji: "💕" },
          { id: "c", text: "Không hài lòng lắm", emoji: "💔" },
          { id: "d", text: "Rất không hài lòng", emoji: "😢" },
        ],
      },
    ],
  },
  {
    id: "study",
    title: "Học tập",
    icon: Book,
    description: "Đánh giá về áp lực học tập và định hướng tương lai",
    color: "#2EC4B6",
    questions: [
      {
        id: 1,
        question: "Bạn có thường xuyên cảm thấy áp lực trong học tập không?",
        options: [
          { id: "a", text: "Hiếm khi, luôn cân bằng tốt", emoji: "😊" },
          {
            id: "b",
            text: "Thỉnh thoảng, nhưng có thể kiểm soát",
            emoji: "😌",
          },
          { id: "c", text: "Thường xuyên, khó kiểm soát", emoji: "😰" },
          { id: "d", text: "Luôn luôn, rất căng thẳng", emoji: "😫" },
        ],
      },
    ],
  },
  {
    id: "social",
    title: "Mạng xã hội",
    icon: Globe,
    description: "Đánh giá về ảnh hưởng của mạng xã hội đến cuộc sống",
    color: "#E71D36",
    questions: [
      {
        id: 1,
        question: "Mạng xã hội ảnh hưởng thế nào đến cuộc sống của bạn?",
        options: [
          { id: "a", text: "Tích cực, giúp kết nối và học hỏi", emoji: "👍" },
          { id: "b", text: "Có cả tích cực và tiêu cực", emoji: "🤔" },
          { id: "c", text: "Tiêu cực nhiều hơn tích cực", emoji: "👎" },
          {
            id: "d",
            text: "Rất tiêu cực, ảnh hưởng xấu đến cuộc sống",
            emoji: "😞",
          },
        ],
      },
    ],
  },
  {
    id: "other",
    title: "Khác",
    icon: MoreHorizontal,
    description: "Đánh giá về các vấn đề khác trong cuộc sống",
    color: "#6C63FF",
    questions: [
      {
        id: 1,
        question: "Bạn có thường xuyên cảm thấy lo lắng về tương lai không?",
        options: [
          { id: "a", text: "Hiếm khi, luôn lạc quan", emoji: "😊" },
          {
            id: "b",
            text: "Thỉnh thoảng, nhưng vẫn kiểm soát được",
            emoji: "😌",
          },
          { id: "c", text: "Thường xuyên, khó kiểm soát", emoji: "😰" },
          { id: "d", text: "Luôn luôn, rất lo lắng", emoji: "😫" },
        ],
      },
    ],
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

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleAnswer = (questionId, optionId) => {
    setAnswers({
      ...answers,
      [questionId]: optionId,
    });
  };

  const handleNext = () => {
    if (currentQuestion < selectedCategory.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
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
  };

  const isQuestionAnswered = (questionId) => {
    return answers[questionId] !== undefined;
  };

  const progressPercentage = selectedCategory
    ? ((currentQuestion + 1) / selectedCategory.questions.length) * 100
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
            <div className="assessment-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="progress-text">
                Câu hỏi {currentQuestion + 1} trên{" "}
                {selectedCategory.questions.length}
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
                {selectedCategory.questions[currentQuestion].question}
              </h2>

              <div className="options-container">
                {selectedCategory.questions[currentQuestion].options.map(
                  (option) => (
                    <div
                      key={option.id}
                      className={`option ${
                        answers[
                          selectedCategory.questions[currentQuestion].id
                        ] === option.id
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleAnswer(
                          selectedCategory.questions[currentQuestion].id,
                          option.id
                        )
                      }
                    >
                      <div className="option-emoji">{option.emoji}</div>
                      <div className="option-text">{option.text}</div>
                      {answers[
                        selectedCategory.questions[currentQuestion].id
                      ] === option.id && <CheckCircle className="check-icon" />}
                    </div>
                  )
                )}
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
                  !isQuestionAnswered(
                    selectedCategory.questions[currentQuestion].id
                  )
                }
              >
                {currentQuestion < selectedCategory.questions.length - 1
                  ? "Tiếp theo"
                  : "Xem kết quả"}
                {currentQuestion < selectedCategory.questions.length - 1 && (
                  <ArrowRight className="button-icon" />
                )}
              </button>
            </div>
          </>
        ) : (
          <AssessmentResult
            answers={answers}
            category={selectedCategory}
            onReset={resetAssessment}
          />
        )}
      </div>
    </main>
  );
}

export default Assessment;

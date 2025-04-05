import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { CheckCircle, ArrowRight, RefreshCw } from "react-icons/lu"
import "../styles/assessment.css"

// Assessment questions and answers
const questions = [
  {
    id: 1,
    question: "How would you describe your stress levels over the past two weeks?",
    options: [
      { id: "a", text: "I rarely feel stressed and can easily manage when I do" },
      { id: "b", text: "I occasionally feel stressed but can usually cope with it" },
      { id: "c", text: "I often feel stressed and sometimes struggle to manage it" },
      { id: "d", text: "I feel constantly overwhelmed by stress and find it difficult to cope" },
    ],
  },
  {
    id: 2,
    question: "How would you rate your sleep quality recently?",
    options: [
      { id: "a", text: "I sleep well and wake up feeling refreshed" },
      { id: "b", text: "I generally sleep well but occasionally have trouble" },
      { id: "c", text: "I often have trouble falling or staying asleep" },
      { id: "d", text: "I have significant sleep problems that affect my daily life" },
    ],
  },
  {
    id: 3,
    question: "How often do you experience feelings of sadness or low mood?",
    options: [
      { id: "a", text: "Rarely or never" },
      { id: "b", text: "Occasionally, but it passes quickly" },
      { id: "c", text: "Frequently, but I can usually manage it" },
      { id: "d", text: "Often and it significantly impacts my daily life" },
    ],
  },
  {
    id: 4,
    question: "How would you describe your social connections and support network?",
    options: [
      { id: "a", text: "I have strong relationships and feel well-supported" },
      { id: "b", text: "I have some good relationships but could use more support" },
      { id: "c", text: "I have few people I can rely on for support" },
      { id: "d", text: "I feel isolated and lack supportive relationships" },
    ],
  },
  {
    id: 5,
    question: "How do you typically respond to setbacks or challenges?",
    options: [
      { id: "a", text: "I see them as opportunities to learn and grow" },
      { id: "b", text: "I try to solve the problem but may get frustrated" },
      { id: "c", text: "I often worry and find it hard to move forward" },
      { id: "d", text: "I tend to feel overwhelmed and struggle to cope" },
    ],
  },
]

// Results based on most common answer
const results = {
  a: {
    title: "Strong Mental Wellbeing",
    description:
      "Your responses suggest you're currently experiencing good mental wellbeing. You appear to have effective coping strategies and a positive outlook. Continue practicing self-care and maintaining your supportive relationships.",
    recommendations: [
      "Continue your current self-care practices",
      "Consider mentoring or supporting others who may be struggling",
      "Explore ways to further enhance your mental resilience",
      "Check out our resources section for wellness maintenance strategies",
    ],
  },
  b: {
    title: "Generally Good Mental Health with Some Stress",
    description:
      "Your responses indicate generally good mental health with occasional stress or challenges. You have coping skills but might benefit from additional strategies during difficult periods.",
    recommendations: [
      "Practice mindfulness or meditation to manage occasional stress",
      "Ensure you're maintaining a healthy work-life balance",
      "Consider scheduling regular self-care activities",
      "Explore our resources section for stress management techniques",
    ],
  },
  c: {
    title: "Moderate Stress or Mood Concerns",
    description:
      "Your responses suggest you're experiencing moderate levels of stress or mood concerns. While you're managing, you might benefit from additional support and coping strategies.",
    recommendations: [
      "Consider developing a structured self-care routine",
      "Explore stress reduction techniques like deep breathing or progressive muscle relaxation",
      "Reach out to trusted friends or family for additional support",
      "Review our resources section for helpful articles and exercises",
    ],
  },
  d: {
    title: "Significant Stress or Emotional Challenges",
    description:
      "Your responses indicate you may be experiencing significant stress or emotional challenges. It's important to know that help is available, and there are effective strategies to improve how you're feeling.",
    recommendations: [
      "Consider speaking with a mental health professional for personalized support",
      "Prioritize basic self-care like sleep, nutrition, and gentle exercise",
      "Practice self-compassion and remember that seeking help is a sign of strength",
      "Check our emergency resources if you need immediate support",
    ],
  },
}

function Assessment({ onCompleteAssessment, previousResults }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [result, setResult] = useState(null)

  // If there are previous results, we can use them to pre-fill answers
  useEffect(() => {
    if (previousResults && Object.keys(answers).length === 0) {
      // This is just a placeholder - in a real app, you'd have logic to convert
      // previous results back into answers if needed
    }
  }, [previousResults, answers])

  const handleAnswer = (questionId, optionId) => {
    setAnswers({
      ...answers,
      [questionId]: optionId,
    })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const calculatedResult = calculateResult()
      setResult(calculatedResult)
      setShowResults(true)

      // Pass the results up to the parent component
      if (onCompleteAssessment) {
        onCompleteAssessment(calculatedResult)
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateResult = () => {
    // Count frequency of each answer type
    const counts = { a: 0, b: 0, c: 0, d: 0 }

    Object.values(answers).forEach((answer) => {
      counts[answer]++
    })

    // Find most common answer
    let mostCommon = "a"
    let highestCount = 0

    Object.entries(counts).forEach(([answer, count]) => {
      if (count > highestCount) {
        highestCount = count
        mostCommon = answer
      }
    })

    return results[mostCommon]
  }

  const resetAssessment = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setResult(null)

    // Clear results in parent component
    if (onCompleteAssessment) {
      onCompleteAssessment(null)
    }
  }

  const isQuestionAnswered = (questionId) => {
    return answers[questionId] !== undefined
  }

  const progressPercentage = ((Object.keys(answers).length / questions.length) * 100).toFixed(0)

  return (
    <main className="assessment-main">
      <div className="assessment-card">
        {!showResults ? (
          <>
            <div className="assessment-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
              </div>
              <div className="progress-text">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>

            <div className="question-container">
              <h2 className="question-text">{questions[currentQuestion].question}</h2>

              <div className="options-container">
                {questions[currentQuestion].options.map((option) => (
                  <div
                    key={option.id}
                    className={`option ${answers[questions[currentQuestion].id] === option.id ? "selected" : ""}`}
                    onClick={() => handleAnswer(questions[currentQuestion].id, option.id)}
                  >
                    <div className="option-checkbox">
                      {answers[questions[currentQuestion].id] === option.id && <CheckCircle className="check-icon" />}
                    </div>
                    <div className="option-text">{option.text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="assessment-actions">
              <button className="action-button secondary" onClick={handlePrevious} disabled={currentQuestion === 0}>
                Previous
              </button>
              <button
                className="action-button primary"
                onClick={handleNext}
                disabled={!isQuestionAnswered(questions[currentQuestion].id)}
              >
                {currentQuestion < questions.length - 1 ? "Next" : "See Results"}
                {currentQuestion < questions.length - 1 ? <ArrowRight className="button-icon" /> : null}
              </button>
            </div>
          </>
        ) : (
          <div className="results-container">
            <h2 className="results-title">{result.title}</h2>
            <p className="results-description">{result.description}</p>

            <div className="recommendations-container">
              <h3 className="recommendations-title">Recommendations</h3>
              <ul className="recommendations-list">
                {result.recommendations.map((recommendation, index) => (
                  <li key={index} className="recommendation-item">
                    {recommendation}
                  </li>
                ))}
              </ul>
            </div>

            <div className="results-actions">
              <button className="action-button primary" onClick={resetAssessment}>
                <RefreshCw className="button-icon" /> Take Assessment Again
              </button>
              <Link to="/recommendations" className="action-button secondary">
                View Personalized Recommendations
              </Link>
            </div>

            <div className="results-disclaimer">
              <p>
                This assessment is not a diagnostic tool. If you're experiencing significant distress, please consult
                with a mental health professional.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default Assessment


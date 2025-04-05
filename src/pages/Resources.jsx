import { useState } from "react"
import { Link } from "react-router-dom"
import { BookOpen, FileText, Video, Headphones, ExternalLink } from "react-icons/lu"
import ResourceCard from "../components/ResourceCode"
import "../styles/resources.css"

function Resources() {
  const [activeTab, setActiveTab] = useState("stress")

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    <main className="resources-main">
      <div className="resources-content">
        <h1 className="page-title">Mental Health Resources</h1>
        <p className="page-description">
          Explore our collection of resources to help you understand and manage stress, depression, and cyberbullying.
          These materials are carefully selected to provide support and guidance.
        </p>

        <div className="tabs">
          <div className="tabs-list">
            <button
              className={`tab-button ${activeTab === "stress" ? "active" : ""}`}
              onClick={() => handleTabChange("stress")}
            >
              Stress & Anxiety
            </button>
            <button
              className={`tab-button ${activeTab === "depression" ? "active" : ""}`}
              onClick={() => handleTabChange("depression")}
            >
              Depression
            </button>
            <button
              className={`tab-button ${activeTab === "cyberbullying" ? "active" : ""}`}
              onClick={() => handleTabChange("cyberbullying")}
            >
              Cyberbullying
            </button>
          </div>

          <div className={`tab-content ${activeTab === "stress" ? "active" : ""}`} id="stress-tab">
            <h2 className="tab-title">Stress & Anxiety Resources</h2>

            <div className="resources-grid">
              <ResourceCard
                icon={<BookOpen className="resource-icon" />}
                title="Understanding Stress"
                description="Learn about the science of stress and how it affects your body and mind."
                type="Article"
              />
              <ResourceCard
                icon={<Video className="resource-icon" />}
                title="5-Minute Breathing Exercise"
                description="A quick guided breathing exercise to help calm your nervous system."
                type="Video"
              />
              <ResourceCard
                icon={<FileText className="resource-icon" />}
                title="Stress Management Workbook"
                description="Interactive exercises to identify stressors and develop coping strategies."
                type="Workbook"
              />
              <ResourceCard
                icon={<Headphones className="resource-icon" />}
                title="Calming Meditation"
                description="A 10-minute guided meditation for stress relief and relaxation."
                type="Audio"
              />
            </div>
          </div>

          <div className={`tab-content ${activeTab === "depression" ? "active" : ""}`} id="depression-tab">
            <h2 className="tab-title">Depression Resources</h2>

            <div className="resources-grid">
              <ResourceCard
                icon={<BookOpen className="resource-icon" />}
                title="Signs and Symptoms of Depression"
                description="Understanding depression, its symptoms, and when to seek professional help."
                type="Article"
              />
              <ResourceCard
                icon={<Video className="resource-icon" />}
                title="Living with Depression"
                description="Personal stories and coping strategies from people who have experienced depression."
                type="Video"
              />
              <ResourceCard
                icon={<FileText className="resource-icon" />}
                title="Mood Tracking Journal"
                description="A printable journal to track your mood, activities, and thoughts over time."
                type="Workbook"
              />
              <ResourceCard
                icon={<ExternalLink className="resource-icon" />}
                title="Finding Professional Help"
                description="Guide to finding therapists, counselors, and support groups in your area."
                type="Guide"
              />
            </div>
          </div>

          <div className={`tab-content ${activeTab === "cyberbullying" ? "active" : ""}`} id="cyberbullying-tab">
            <h2 className="tab-title">Cyberbullying Resources</h2>

            <div className="resources-grid">
              <ResourceCard
                icon={<BookOpen className="resource-icon" />}
                title="Recognizing Cyberbullying"
                description="How to identify different forms of cyberbullying and their impact."
                type="Article"
              />
              <ResourceCard
                icon={<Video className="resource-icon" />}
                title="Digital Safety Strategies"
                description="Practical steps to protect yourself online and respond to cyberbullying."
                type="Video"
              />
              <ResourceCard
                icon={<FileText className="resource-icon" />}
                title="Documentation Template"
                description="A template for documenting cyberbullying incidents for reporting purposes."
                type="Template"
              />
              <ResourceCard
                icon={<ExternalLink className="resource-icon" />}
                title="Reporting Guide"
                description="Step-by-step instructions for reporting cyberbullying on different platforms."
                type="Guide"
              />
            </div>
          </div>
        </div>

        <section className="self-care-section">
          <h2 className="section-title">Self-Care Practices</h2>
          <div className="self-care-grid">
            <div className="self-care-card">
              <h3 className="self-care-title">Physical Self-Care</h3>
              <ul className="self-care-list">
                <li>Regular exercise</li>
                <li>Adequate sleep</li>
                <li>Balanced nutrition</li>
                <li>Staying hydrated</li>
                <li>Taking breaks from screens</li>
              </ul>
            </div>

            <div className="self-care-card">
              <h3 className="self-care-title">Mental Self-Care</h3>
              <ul className="self-care-list">
                <li>Mindfulness meditation</li>
                <li>Journaling</li>
                <li>Creative expression</li>
                <li>Learning new skills</li>
                <li>Setting boundaries</li>
              </ul>
            </div>

            <div className="self-care-card">
              <h3 className="self-care-title">Social Self-Care</h3>
              <ul className="self-care-list">
                <li>Connecting with friends</li>
                <li>Joining support groups</li>
                <li>Volunteering</li>
                <li>Asking for help when needed</li>
                <li>Setting healthy boundaries</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="chat-cta">
          <h2 className="section-title">Need to Assess Your Mental Wellbeing?</h2>
          <p className="cta-description">
            Take our psychological assessment to better understand your mental health and get personalized
            recommendations.
          </p>
          <Link to="/assessment" className="primary-button">
            Take Assessment
          </Link>
        </section>
      </div>
    </main>
  )
}

export default Resources


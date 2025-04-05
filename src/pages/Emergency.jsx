import { Link } from "react-router-dom"
import { Phone, MessageSquare, Globe, AlertTriangle } from "react-icons/lu"
import EmergencyCard from "../components/EmergencyCard"
import "../styles/emergency.css"

function Emergency() {
  return (
    <main className="emergency-main">
      <div className="emergency-content">
        <div className="alert-banner">
          <AlertTriangle className="alert-icon" />
          <div>
            <h2 className="alert-title">Emergency Help</h2>
            <p className="alert-message">
              If you're in immediate danger or experiencing a mental health crisis, please contact emergency services or
              a crisis hotline immediately.
            </p>
          </div>
        </div>

        <h1 className="page-title">Emergency Resources</h1>
        <p className="page-description">
          If you're experiencing a crisis or need immediate support, the resources below can provide immediate
          assistance. These services are available 24/7 and are staffed by trained professionals.
        </p>

        <div className="emergency-grid">
          <EmergencyCard icon={<Phone className="emergency-icon phone-icon" />} title="Crisis Hotlines" color="red">
            <div className="hotlines">
              <div className="hotline">
                <h4 className="hotline-name">National Suicide Prevention Lifeline</h4>
                <p className="hotline-number">1-800-273-8255</p>
                <p className="hotline-description">24/7 support for people in distress</p>
              </div>
              <div className="hotline">
                <h4 className="hotline-name">Crisis Text Line</h4>
                <p className="hotline-number">Text HOME to 741741</p>
                <p className="hotline-description">24/7 text support with a crisis counselor</p>
              </div>
              <div className="hotline">
                <h4 className="hotline-name">Veterans Crisis Line</h4>
                <p className="hotline-number">1-800-273-8255 (Press 1)</p>
                <p className="hotline-description">Support for veterans and their loved ones</p>
              </div>
            </div>
          </EmergencyCard>

          <EmergencyCard
            icon={<MessageSquare className="emergency-icon chat-icon" />}
            title="Chat Services"
            color="blue"
          >
            <div className="chat-services">
              <div className="chat-service">
                <h4 className="service-name">IMAlive</h4>
                <p className="service-description">Online crisis network with trained volunteers</p>
                <button className="service-button blue">Visit Website</button>
              </div>
              <div className="chat-service">
                <h4 className="service-name">7 Cups</h4>
                <p className="service-description">Online emotional support service</p>
                <button className="service-button blue">Visit Website</button>
              </div>
              <div className="chat-service">
                <h4 className="service-name">Teen Line</h4>
                <p className="service-description">Support for teens by teens</p>
                <button className="service-button blue">Visit Website</button>
              </div>
            </div>
          </EmergencyCard>
        </div>

        <section className="what-to-expect">
          <h2 className="section-title">What to Expect When You Call</h2>
          <div className="steps">
            <div className="step">
              <h3 className="step-title">1. Introduction</h3>
              <p className="step-description">
                A trained crisis counselor will answer your call and introduce themselves. They'll ask for your name,
                but you can remain anonymous if you prefer.
              </p>
            </div>
            <div className="step">
              <h3 className="step-title">2. Assessment</h3>
              <p className="step-description">
                The counselor will ask questions to understand your situation and assess your immediate safety. They're
                trained to handle a wide range of crisis situations.
              </p>
            </div>
            <div className="step">
              <h3 className="step-title">3. Support</h3>
              <p className="step-description">
                The counselor will listen without judgment and provide emotional support. They may offer coping
                strategies or resources specific to your situation.
              </p>
            </div>
            <div className="step">
              <h3 className="step-title">4. Safety Planning</h3>
              <p className="step-description">
                If needed, the counselor will help you create a safety plan and connect you with local resources. In
                extreme emergencies, they may help arrange emergency services.
              </p>
            </div>
          </div>
        </section>

        <div className="emergency-grid">
          <EmergencyCard
            icon={<Globe className="emergency-icon globe-icon" />}
            title="International Resources"
            color="teal"
          >
            <div className="international-resources">
              <div className="resource">
                <h4 className="resource-name">International Association for Suicide Prevention</h4>
                <p className="resource-description">Directory of crisis centers around the world</p>
                <button className="service-button teal">Find Resources</button>
              </div>
              <div className="resource">
                <h4 className="resource-name">Befrienders Worldwide</h4>
                <p className="resource-description">Volunteer action to prevent suicide</p>
                <button className="service-button teal">Find Local Helpline</button>
              </div>
            </div>
          </EmergencyCard>

          <div className="when-to-seek-help">
            <h3 className="card-title">When to Seek Emergency Help</h3>
            <ul className="warning-list">
              <li className="warning-item">
                <AlertTriangle className="warning-icon" />
                <p>Thoughts of harming yourself or others</p>
              </li>
              <li className="warning-item">
                <AlertTriangle className="warning-icon" />
                <p>Experiencing a panic attack that won't stop</p>
              </li>
              <li className="warning-item">
                <AlertTriangle className="warning-icon" />
                <p>Feeling out of control or disconnected from reality</p>
              </li>
              <li className="warning-item">
                <AlertTriangle className="warning-icon" />
                <p>Unable to care for yourself or perform basic functions</p>
              </li>
              <li className="warning-item">
                <AlertTriangle className="warning-icon" />
                <p>In immediate danger from others</p>
              </li>
            </ul>
          </div>
        </div>

        <section className="chat-cta">
          <h2 className="section-title">Need to Assess Your Mental Wellbeing?</h2>
          <p className="cta-description">
            If you're not in crisis but would like to better understand your mental health, our assessment can provide
            insights and recommendations.
          </p>
          <Link to="/assessment" className="primary-button">
            Take Assessment
          </Link>
        </section>
      </div>
    </main>
  )
}

export default Emergency


import { Link } from "react-router-dom";
import { MessageCircle, BookOpen, LifeBuoy, BarChart3 } from "lucide-react";
import FeatureCard from "../components/FeartureCard";
import "../styles/home.css";

function Home() {
  return (
    <main className="main">
      <section className="hero">
        <h2 className="hero-title">Your Supportive AI Companion</h2>
        <p className="hero-description">
          A safe space to talk, find resources, and get support for stress,
          depression, and cyberbullying.
        </p>
        <div className="hero-buttons">
          <Link to="/assessment" className="primary-button">
            Take Assessment
          </Link>
          <Link to="/resources" className="secondary-button">
            Explore Resources
          </Link>
        </div>
      </section>

      <section className="features">
        <FeatureCard
          icon={<MessageCircle className="feature-icon" />}
          title="Mental Health Assessment"
          description="Take our psychological assessment to better understand your mental wellbeing and get personalized recommendations."
        />
        <FeatureCard
          icon={<BookOpen className="feature-icon" />}
          title="Helpful Resources"
          description="Access articles, videos, and exercises designed to help with stress, depression, and cyberbullying."
        />
        <FeatureCard
          icon={<LifeBuoy className="feature-icon" />}
          title="Emergency Support"
          description="Quick access to crisis hotlines and professional help when you need immediate assistance."
        />
        <FeatureCard
          icon={<BarChart3 className="feature-icon" />}
          title="Personalized Recommendations"
          description="Receive tailored suggestions for images, videos, and locations to support your mental wellbeing."
        />
      </section>

      <section className="help-section">
        <h2 className="section-title">How We Can Help</h2>
        <div className="help-grid">
          <div className="help-item">
            <h3 className="help-title">For Stress & Anxiety</h3>
            <p className="help-description">
              Learn techniques to manage stress, practice mindfulness, and
              develop healthy coping mechanisms.
            </p>
            <ul className="help-list">
              <li>Guided breathing exercises</li>
              <li>Stress reduction techniques</li>
              <li>Sleep improvement strategies</li>
            </ul>
          </div>
          <div className="help-item">
            <h3 className="help-title">For Depression</h3>
            <p className="help-description">
              Find support, resources, and tools to help navigate through
              depression and build resilience.
            </p>
            <ul className="help-list">
              <li>Mood tracking and journaling</li>
              <li>Positive psychology exercises</li>
              <li>Connection to professional help</li>
            </ul>
          </div>
          <div className="help-item">
            <h3 className="help-title">For Cyberbullying</h3>
            <p className="help-description">
              Get guidance on handling cyberbullying situations, protecting
              yourself online, and finding support.
            </p>
            <ul className="help-list">
              <li>Documentation strategies</li>
              <li>Blocking and reporting guidance</li>
              <li>Building digital resilience</li>
            </ul>
          </div>
          <div className="help-item">
            <h3 className="help-title">For Everyone</h3>
            <p className="help-description">
              Access general mental wellness resources and supportive tools that
              are always there when you need them.
            </p>
            <ul className="help-list">
              <li>Psychological assessments</li>
              <li>Educational resources</li>
              <li>Self-care recommendations</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2 className="section-title">Ready to Start Your Journey?</h2>
        <p className="cta-description">
          Take the first step toward better mental well-being with our
          supportive tools and resources.
        </p>
        <Link to="/assessment" className="primary-button">
          Take Assessment Now
        </Link>
      </section>
    </main>
  );
}

export default Home;

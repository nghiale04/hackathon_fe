import { Link } from "react-router-dom"
import "../styles/footer.css"

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-column">
            <h3 className="footer-title">MindfulCompanion</h3>
            <p className="footer-description">Your companion for mental wellness and support.</p>
          </div>
          <div className="footer-column">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/assessment" className="footer-link">
                  Assessment
                </Link>
              </li>
              <li>
                <Link to="/resources" className="footer-link">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/recommendations" className="footer-link">
                  Recommendations
                </Link>
              </li>
              <li>
                <Link to="/emergency" className="footer-link">
                  Emergency Help
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="footer-subtitle">Resources</h4>
            <ul className="footer-links">
              <li>
                <Link to="/resources" className="footer-link">
                  Stress Management
                </Link>
              </li>
              <li>
                <Link to="/resources" className="footer-link">
                  Depression Support
                </Link>
              </li>
              <li>
                <Link to="/resources" className="footer-link">
                  Cyberbullying Help
                </Link>
              </li>
              <li>
                <Link to="/resources" className="footer-link">
                  Self-Care Tips
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="footer-subtitle">Important Notice</h4>
            <p className="footer-notice">
              This application is not a replacement for professional mental health care. If you're experiencing a
              crisis, please contact emergency services or a mental health professional immediately.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} MindfulCompanion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


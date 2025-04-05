import { Link } from "react-router-dom"
import "../styles/header.css"

function Header({ activePage }) {
  return (
    <header className="header">
      <h1 className="logo">MindfulCompanion</h1>
      <nav className="nav">
        <Link to="/" className={`nav-link ${activePage === "home" ? "active" : ""}`}>
          Home
        </Link>
        <Link to="/assessment" className={`nav-link ${activePage === "assessment" ? "active" : ""}`}>
          Assessment
        </Link>
        <Link to="/resources" className={`nav-link ${activePage === "resources" ? "active" : ""}`}>
          Resources
        </Link>
        <Link to="/recommendations" className={`nav-link ${activePage === "recommendations" ? "active" : ""}`}>
          Recommendations
        </Link>
        <Link to="/emergency" className={`nav-link ${activePage === "emergency" ? "active" : ""}`}>
          Emergency
        </Link>
      </nav>
      <Link to="/emergency" className="help-button">
        Get Help Now
      </Link>
    </header>
  )
}

export default Header


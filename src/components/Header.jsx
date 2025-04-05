import { Link, useNavigate } from "react-router-dom";
import {
  LogIn,
  UserPlus,
  Home,
  MessageCircle,
  BookOpen,
  LifeBuoy,
  LogOut,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import "../styles/header.css";

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          <Home className="logo-icon" />
          <span>SoulMate AI </span>
        </Link>
      </div>

      <nav className="nav">
        <Link to="/assessment" className="nav-link">
          <MessageCircle className="nav-icon" />
          <span>Đánh giá</span>
        </Link>
        <Link to="/resources" className="nav-link">
          <BookOpen className="nav-icon" />
          <span>Tài nguyên</span>
        </Link>
     
      </nav>

      <div className="header-right">
        {user ? (
          <div className="user-info">
            <div className="user-profile">
              <User className="user-icon" />
              <span
                className="user-name"
                onClick={() => navigate("/assessment-history")}
              >
                {user.fullname}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="logout-button"
              style={{ backgroundColor: "#666", opacity: 1 }}
            >
              <LogOut className="logout-icon" />
              <span>Đăng xuất</span>
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="auth-button login">
              <LogIn className="auth-icon" />
              <span>Đăng nhập</span>
            </Link>
            <Link to="/register" className="auth-button register">
              <UserPlus className="auth-icon" />
              <span>Đăng ký</span>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

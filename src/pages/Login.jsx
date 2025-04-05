import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import axios from "axios";
import Header from "../components/Header";
import "../styles/auth.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    // Validate email
    if (!formData.email) {
      errors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email không hợp lệ";
    }

    // Validate password
    if (!formData.password) {
      errors.password = "Vui lòng nhập mật khẩu";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error when user types
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        username: formData.email,
        password: formData.password
      });

      if (response.status === 200) {
        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            fullname: response.data.fullname,
            email: formData.email,
          })
        );
        navigate("/");
      } else {
        setError(response.data.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Đăng nhập thất bại");
      } else {
        setError(err.message || "Không thể kết nối tới máy chủ");
      }
    }
  };

  return (
    <>
      <Header />
      <main className="auth-container" style={{ marginTop: "100px" }}>
        <div className="auth-card">
          <div className="auth-header">
            <LogIn className="auth-icon" />
            <h2>Đăng nhập</h2>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={validationErrors.email ? "error" : ""}
              />
              {validationErrors.email && (
                <span className="validation-error">
                  {validationErrors.email}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={validationErrors.password ? "error" : ""}
              />
              {validationErrors.password && (
                <span className="validation-error">
                  {validationErrors.password}
                </span>
              )}
            </div>

            <button type="submit" className="primary-button">
              Đăng nhập
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Chưa có tài khoản?{" "}
              <Link to="/register" className="auth-link">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import axios from "axios";
import Header from "../components/Header";
import "../styles/auth.css";

function Register() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    // Validate fullname
    if (!formData.fullname) {
      errors.fullname = "Vui lòng nhập họ và tên";
    } else if (formData.fullname.length < 2) {
      errors.fullname = "Họ và tên quá ngắn";
    }

    // Validate email
    if (!formData.email) {
      errors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email không hợp lệ";
    }

    // Validate password
    if (!formData.password) {
      errors.password = "Vui lòng nhập mật khẩu";
    } else if (formData.password.length < 4) {
      errors.password = "Mật khẩu phải có ít nhất 4 ký tự";
    } 

    // Validate confirm password
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Mật khẩu không khớp";
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
      const response = await axios.post("http://localhost:8080/api/register", {
        fullname: formData.fullname,
        username: formData.email,
        password: formData.password,
      });

      if (response.data.statusCode == 201) {
        navigate("/login");
      } else {
        setError(response.data.message || "Đăng ký thất bại");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Đăng ký thất bại");
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
            <UserPlus className="auth-icon" />
            <h2>Đăng ký</h2>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="fullname">Họ và tên</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className={validationErrors.fullname ? "error" : ""}
              />
              {validationErrors.fullname && (
                <span className="validation-error">
                  {validationErrors.fullname}
                </span>
              )}
            </div>

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

            <div className="form-group">
              <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={validationErrors.confirmPassword ? "error" : ""}
              />
              {validationErrors.confirmPassword && (
                <span className="validation-error">
                  {validationErrors.confirmPassword}
                </span>
              )}
            </div>

            <button type="submit" className="primary-button">
              Đăng ký
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Đã có tài khoản?{" "}
              <Link to="/login" className="auth-link">
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default Register;

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./LoginScreen.css";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-content">
        {/* Logo + Title */}
        <div className="text-center mb-4">
          <div className="login-logo-container">
            <svg
              className="text-white"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>

          <h2 className="login-title">Welcome back</h2>
          <p className="login-subtitle">Sign in to continue</p>
        </div>

        {/* Social Buttons */}
        <div className="d-grid gap-2 mb-4">
          <button className="btn-google" onClick={() => navigate("/dashboard")}>
            <svg className="me-2" width="18" height="18" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Divider */}
        <div className="login-divider">
          <span className="login-divider-text">Or sign in with email</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-4">
          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="position-relative">
              <Mail size={18} className="position-absolute top-50 translate-middle-y ms-2" style={{ color: "#6b7280" }} />
              <input
                type="email"
                className="form-control ps-5 py-2"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="form-label">Password</label>
            <div className="position-relative">
              <Lock size={18} className="position-absolute top-50 translate-middle-y ms-2" style={{ color: "#6b7280" }} />

              <input
                type={showPassword ? "text" : "password"}
                className="form-control ps-5 pe-5 py-2"
                placeholder="••••••••"
                value={formData.password}
                required
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />

              {/* Toggle */}
              <button
                type="button"
                className="btn position-absolute end-0 top-50 translate-middle-y"
                style={{ background: "none", border: "none", color: "#6b7280" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-submit mt-2">
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center mt-3 login-link-text">
          Don't have an account?{" "}
          <button className="login-link" onClick={() => navigate("/signup")}>
            Sign up
          </button>
        </p>

        {/* Back */}
        <div className="text-center mt-2">
          <button className="back-link" onClick={() => navigate("/")}>
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}


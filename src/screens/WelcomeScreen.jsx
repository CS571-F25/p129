import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Mail, Apple } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./WelcomeScreen.css";

export default function WelcomeScreen() {
  const navigate = useNavigate();

  const handleNext = () => navigate("/signup");
  const handleLogin = () => navigate("/login");

  return (
    <div className="welcome-container">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5} className="text-center">
            {/* Logo */}
            <div className="logo-container">
              <svg
                className="logo-icon"
                viewBox="0 0 24 24"
                stroke="white"
                fill="none"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>

            <h1 className="app-title">NutriPlan</h1>
            <p className="app-tagline">Your personal meal planning assistant</p>

            {/* Buttons */}
            <div className="d-grid gap-3 buttons-container">
              {/* Email */}
              <Button size="lg" onClick={handleNext} className="btn-email">
                <Mail className="me-2" size={20} style={{ color: "white" }} />
                Sign up with Email
              </Button>

              {/* Google */}
              <Button size="lg" onClick={handleNext} className="btn-social">
                <svg
                  className="me-2"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="#374151"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </Button>

          
            </div>

            {/* Login Link */}
            <p className="login-text">
              Already have an account?{" "}
              <span onClick={handleLogin} className="login-link">
                Login
              </span>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

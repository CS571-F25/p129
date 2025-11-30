import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./WelcomeScreen.css";

export default function WelcomeScreen() {
  const navigate = useNavigate();

  const handleGetStarted = () => navigate("/personal-info");

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

            <h1 className="app-title">MealEase</h1>
            <p className="app-tagline">Your personal meal planning assistant</p>

            {/* Get Started Button */}
            <div className="d-grid gap-3 buttons-container">
              <Button size="lg" onClick={handleGetStarted} className="btn-email">
                Get Started
                <ArrowRight className="ms-2" size={20} />
              </Button>
            </div>

            
             
            
          </Col>
        </Row>
      </Container>
    </div>
  );
}

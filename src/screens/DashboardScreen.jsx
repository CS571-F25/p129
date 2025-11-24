import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Plus, Sparkles, ShoppingCart, Grid3x3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./DashboardScreen.css";

export default function DashboardScreen() {
  const navigate = useNavigate();

  // Nutrition values matching the image
  const totalCalories = 1870;
  const targetCalories = 2000;
  const totalProtein = 97;
  const totalCarbs = 153;
  const totalFat = 84;

  // Only showing breakfast meal as per the image
  const breakfastMeal = {
    type: "BREAKFAST",
    name: "Avocado Toast & Smoothie Bowl",
    calories: 450,
    protein: 15,
    carbs: 52,
    fat: 18,
    image: "https://images.unsplash.com/photo-1676471970358-1cff04452e7b?w=400&h=300&fit=crop",
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        {/* Top Right Icons */}
        <div className="header-icons">
          {/* <Grid3x3 size={20} className="header-icon" /> */}
          <div className="alpha-badge">J</div>
        </div>

        <Container>
          <p className="greeting-text">Good Morning,</p>
          <h1 className="user-name">Jamie!</h1>
          <p className="date-text">Monday, October 6, 2025</p>
        </Container>
      </div>

      {/* Body */}
      <Container style={{ marginTop: "-30px" }}>
        {/* Summary Card */}
        <Card className="nutrition-card shadow-sm">
          <h5 className="nutrition-title">Today's Nutrition</h5>

          {/* Calories */}
          <div className="mb-4">
            <div className="d-flex justify-content-between mb-2">
              <small className="text-muted calories-label">Calories</small>
              <small className="calories-value">
                {totalCalories} / {targetCalories} kcal
              </small>
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${(totalCalories / targetCalories) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Macros */}
          <Row className="text-center mt-3">
            <Col>
              <small className="text-muted macro-label">Protein</small>
              <p className="fs-5 macro-value">{totalProtein}g</p>
            </Col>
            <Col>
              <small className="text-muted macro-label">Carbs</small>
              <p className="fs-5 macro-value">{totalCarbs}g</p>
            </Col>
            <Col>
              <small className="text-muted macro-label">Fat</small>
              <p className="fs-5 macro-value">{totalFat}g</p>
            </Col>
          </Row>
        </Card>

        {/* Meals */}
        <h4 className="meals-title">Today's Meals</h4>

        <div className="d-flex flex-column gap-3">
          <Card
            onClick={() => navigate("/meal-planner")}
            className="meal-card shadow-sm"
          >
            <Row className="g-0">
              <Col xs={4} md={3}>
                <div className="meal-image-container">
                  <img
                    src={breakfastMeal.image}
                    alt={breakfastMeal.name}
                    className="meal-image"
                  />
                </div>
              </Col>
              <Col xs={8} md={9} className="p-4">
                <small className="meal-type">{breakfastMeal.type}</small>
                <h6 className="meal-name">{breakfastMeal.name}</h6>
                <small className="meal-nutrition">
                  {breakfastMeal.calories} kcal • P: {breakfastMeal.protein}g • C: {breakfastMeal.carbs}g • F: {breakfastMeal.fat}g
                </small>
              </Col>
            </Row>
          </Card>

          <Card
            onClick={() => navigate("/meal-planner")}
            className="meal-card shadow-sm"
          >
            <Row className="g-0">
              <Col xs={4} md={3}>
                <div className="meal-image-container">
                  <img
                    src={breakfastMeal.image}
                    alt={breakfastMeal.name}
                    className="meal-image"
                  />
                </div>
              </Col>
              <Col xs={8} md={9} className="p-4">
                <small className="meal-type">{breakfastMeal.type}</small>
                <h6 className="meal-name">{breakfastMeal.name}</h6>
                <small className="meal-nutrition">
                  {breakfastMeal.calories} kcal • P: {breakfastMeal.protein}g • C: {breakfastMeal.carbs}g • F: {breakfastMeal.fat}g
                </small>
              </Col>
            </Row>
          </Card>

          <Card
            onClick={() => navigate("/meal-planner")}
            className="meal-card shadow-sm"
          >
            <Row className="g-0">
            <Col xs={4} md={3}>
                <div className="meal-image-container">
                  <img
                    src={breakfastMeal.image}
                    alt={breakfastMeal.name}
                    className="meal-image"
                  />
                </div>
              </Col>
              <Col xs={8} md={9} className="p-4">
                <small className="meal-type">{breakfastMeal.type}</small>
                <h6 className="meal-name">{breakfastMeal.name}</h6>
                <small className="meal-nutrition">
                  {breakfastMeal.calories} kcal • P: {breakfastMeal.protein}g • C: {breakfastMeal.carbs}g • F: {breakfastMeal.fat}g
                </small>
              </Col>
            </Row>
          </Card>
        </div>

        
      </Container>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <Container>
          <Row className="text-center g-2">
            <Col>
              <Button
                className="nav-button nav-button-white"
                onClick={() => navigate("/recipe-database")}
              >
                <Plus size={22} className="nav-icon nav-icon-white" />
                <small className="nav-label nav-label-white">Add Meal</small>
              </Button>
            </Col>
            <Col>
              <Button
                className="nav-button nav-button-green"
                onClick={() => navigate("/meal-planner")}
              >
                <Sparkles size={22} className="nav-icon nav-icon-green" />
                <small className="nav-label nav-label-green">AI Plan</small>
              </Button>
            </Col>
            <Col>
              <Button
                className="nav-button nav-button-white"
                onClick={() => navigate("/shopping-list")}
              >
                <ShoppingCart size={22} className="nav-icon nav-icon-white" />
                <small className="nav-label nav-label-white">Shopping</small>
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

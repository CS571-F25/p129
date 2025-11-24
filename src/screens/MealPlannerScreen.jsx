import React, { useState } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { ChevronLeft, MoreVertical, Plus, Shuffle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./MealPlannerScreen.css";

const weeklyMeals = {
  Monday: [
    {
      type: "Breakfast",
      name: "Avocado Toast & Smoothie Bowl",
      calories: 450,
      image:
        "https://images.unsplash.com/photo-1676471970358-1cff04452e7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
    },
    {
      type: "Lunch",
      name: "Mediterranean Salad Bowl",
      calories: 520,
      image:
        "https://images.unsplash.com/photo-1670970146850-c892818f76a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
    },
    {
      type: "Dinner",
      name: "Grilled Salmon with Vegetables",
      calories: 620,
      image:
        "https://images.unsplash.com/photo-1759271082074-6cde09f86550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
    },
  ],
  Tuesday: [
    {
      type: "Breakfast",
      name: "Protein Smoothie Bowl",
      calories: 380,
      image:
        "https://images.unsplash.com/photo-1592503469196-3a7880cc2d05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
    },
    {
      type: "Lunch",
      name: "Grilled Chicken & Quinoa",
      calories: 580,
      image:
        "https://images.unsplash.com/photo-1496074620649-6b1b02e5c1c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
    },
    {
      type: "Dinner",
      name: "Pasta Primavera",
      calories: 560,
      image:
        "https://images.unsplash.com/photo-1593996470434-890a14b11a6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
    },
  ],
};

export default function MealPlannerScreen() {
  const navigate = useNavigate();
  const [view, setView] = useState("day");

  return (
    <div className="meal-planner-container">
      <Container>
        {/* Header */}
        <div className="meal-planner-header">
          <div className="header-left">
            <Button variant="light" className="back-button" onClick={() => navigate(-1)}>
              <ChevronLeft size={20} />
            </Button>
            <h2 className="header-title">Meal Planner</h2>
          </div>

          <Button variant="light" className="menu-button">
            <MoreVertical size={18} />
          </Button>
        </div>

        {/* View Toggle - Segmented Control */}
        <div className="view-toggle-container">
          <button
            className={`view-toggle-button ${view === "day" ? "active" : ""}`}
            onClick={() => setView("day")}
          >
            Daily View
          </button>
          <button
            className={`view-toggle-button ${view === "week" ? "active" : ""}`}
            onClick={() => setView("week")}
          >
            Weekly View
          </button>
        </div>

        {/* DAILY VIEW */}
        {view === "day" && (
          <>
            <div className="day-header">
              <h4 className="day-title">Monday, October 6</h4>
              <span className="day-calories">1870 kcal</span>
            </div>

            <div className="meals-list">
              {weeklyMeals.Monday.map((meal, index) => (
                <Card className="meal-card shadow-sm" key={index}>
                  <div className="meal-card-content">
                    <div className="meal-image-wrapper">
                      <img
                        src={meal.image}
                        alt={meal.name}
                        className="meal-image"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/100?text=Meal";
                        }}
                      />
                    </div>

                    <div className="meal-details">
                      <p className="meal-type">{meal.type.toUpperCase()}</p>
                      <h5 className="meal-name">{meal.name}</h5>
                      <p className="meal-calories">{meal.calories} kcal</p>

                      <div className="meal-actions">
                        <button className="action-button btn-swap">
                          <Shuffle size={14} />
                          Swap
                        </button>

                        <button
                          className="action-button btn-edit"
                          onClick={() => navigate("/recipe-database")}
                        >
                          Edit
                        </button>

                        <button className="action-button btn-delete">Delete</button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <button
              className="add-meal-button"
              onClick={() => navigate("/recipe-database")}
            >
              <Plus size={16} />
              Add Meal
            </button>
          </>
        )}

        {/* WEEKLY VIEW */}
        {view === "week" && (
          <div className="weekly-view-container">
            <Row className="g-4">
              {Object.entries(weeklyMeals).map(([day, meals]) => (
                <Col lg={6} key={day}>
                  <div className="week-day-section">
                    <div className="week-day-header">
                      <h5 className="week-day-title">{day}</h5>
                      <span className="week-day-calories">
                        {meals.reduce((sum, m) => sum + m.calories, 0)} kcal
                      </span>
                    </div>

                    <div className="week-meals-grid">
                      {meals.map((meal, index) => (
                        <Card className="week-meal-card shadow-sm" key={index}>
                          <div className="week-meal-image-container">
                            <img
                              src={meal.image}
                              alt={meal.name}
                              className="week-meal-image"
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/200?text=Meal";
                              }}
                            />
                          </div>
                          <div className="week-meal-body">
                            <p className="week-meal-type">{meal.type}</p>
                            <p className="week-meal-name">{meal.name}</p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
}

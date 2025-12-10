import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Plus, ShoppingCart, CalendarDays, RefreshCw, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./DashboardScreen.css";

// Calculate daily calorie needs based on user info
function calculateCalories({ age, height_cm, weight_kg, sex, activityLevel }) {
  // Step 1: BMR (Basal Metabolic Rate)
  let BMR;
  if (sex === "male") {
    BMR = 10 * weight_kg + 6.25 * height_cm - 5 * age + 5;
  } else if (sex === "female") {
    BMR = 10 * weight_kg + 6.25 * height_cm - 5 * age - 161;
  } else {
    return 2000; // Default if sex not specified
  }

  // Step 2: Activity multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    extra_active: 1.9,
  };

  const multiplier = activityMultipliers[activityLevel] || 1.2;

  // Step 3: Total calories
  return Math.round(BMR * multiplier);
}

export default function DashboardScreen() {
  const navigate = useNavigate();
  
  // Get user name from localStorage
  const [userName, setUserName] = useState("Guest");
  const [targetCalories, setTargetCalories] = useState(2000);
  const [todayMeals, setTodayMeals] = useState({});
  
  // Load data from localStorage
  useEffect(() => {
    const loadData = () => {
      const storedName = localStorage.getItem("userName");
      if (storedName) {
        setUserName(storedName);
      }

      // Calculate target calories from stored user info
      const storedInfo = localStorage.getItem("userInfo");
      if (storedInfo) {
        const userInfo = JSON.parse(storedInfo);
        const calories = calculateCalories({
          age: parseInt(userInfo.age) || 25,
          height_cm: parseInt(userInfo.height) || 170,
          weight_kg: parseInt(userInfo.weight) || 70,
          sex: userInfo.gender,
          activityLevel: userInfo.activityLevel,
        });
        setTargetCalories(calories);
      }

      // Load planned meals for today
      const currentUserName = localStorage.getItem("userName") || "Guest";
      const plannedMeals = JSON.parse(localStorage.getItem(`${currentUserName}_plannedMeals`) || "{}");
      const todayKey = new Date().toISOString().split("T")[0];
      // Check for meals matching today's date
      const todaysMeals = {};
      Object.keys(plannedMeals).forEach(key => {
        if (key.startsWith(todayKey)) {
          Object.assign(todaysMeals, plannedMeals[key]);
        }
      });
      setTodayMeals(todaysMeals);
    };

    loadData();
    
    // Listen for storage changes (when returning from recipe database)
    window.addEventListener("storage", loadData);
    // Also reload when component gets focus
    window.addEventListener("focus", loadData);
    
    return () => {
      window.removeEventListener("storage", loadData);
      window.removeEventListener("focus", loadData);
    };
  }, []);

  // Get first name only for display
  const firstName = userName.split(" ")[0];

  // Get current date
  const today = new Date();
  const dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", dateOptions);
  const shortDateFormat = today.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = today.getHours();
    if (hour < 12) return "Good Morning,";
    if (hour < 17) return "Good Afternoon,";
    return "Good Evening,";
  };

  const mealTypes = ["Breakfast", "Lunch", "Dinner"];

  // Delete a meal
  const handleDeleteMeal = (e, mealType) => {
    e.stopPropagation();
    const currentUserName = localStorage.getItem("userName") || "Guest";
    const plannedMeals = JSON.parse(localStorage.getItem(`${currentUserName}_plannedMeals`) || "{}");
    const todayKey = new Date().toISOString().split("T")[0];
    
    // Find and delete the meal
    Object.keys(plannedMeals).forEach(key => {
      if (key.startsWith(todayKey) && plannedMeals[key][mealType]) {
        delete plannedMeals[key][mealType];
      }
    });
    
    localStorage.setItem(`${currentUserName}_plannedMeals`, JSON.stringify(plannedMeals));
    
    // Update state
    const newTodayMeals = { ...todayMeals };
    delete newTodayMeals[mealType];
    setTodayMeals(newTodayMeals);
  };

  // Swap a meal (navigate to recipe database)
  const handleSwapMeal = (e, mealType) => {
    e.stopPropagation();
    navigate("/recipe-database", { 
      state: { 
        mealType, 
        date: shortDateFormat,
        fullDate: today.toISOString()
      } 
    });
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <Container>
          <p className="greeting-text">{getGreeting()}</p>
          <h1 className="user-name">{firstName}!</h1>
          <p className="date-text">{formattedDate}</p>
        </Container>
      </div>

      {/* Body */}
      <Container style={{ marginTop: "-30px" }}>
        {/* Summary Card */}
        <Card className="nutrition-card shadow-sm">
          <h2 className="nutrition-title">Daily Calories Needed</h2>
          <div className="calories-display">
            <span className="calories-number">{targetCalories}</span>
            <span className="calories-unit">calories per day</span>
          </div>
        </Card>

        {/* Meals */}
        <h2 className="meals-title">Today's Meals</h2>

        <div className="d-flex flex-column gap-3">
          {mealTypes.map((mealType) => {
            const meal = todayMeals[mealType];
            return (
              <Card 
                key={mealType}
                className={`meal-slot-card shadow-sm ${meal ? "has-meal" : ""}`}
                onClick={() => {
                  if (meal) {
                    navigate(`/recipe/${meal.id}`);
                  } else {
                    navigate("/recipe-database", { 
                      state: { 
                        mealType, 
                        date: shortDateFormat,
                        fullDate: today.toISOString()
                      } 
                    });
                  }
                }}
              >
                {meal ? (
                  <div className="meal-added-content">
                    <img 
                      src={meal.image} 
                      alt={meal.name} 
                      className="meal-added-image"
                    />
                    <div className="meal-added-info">
                      <span className="meal-slot-type">{mealType}</span>
                      <span className="meal-added-name">{meal.name}</span>
                    </div>
                    <div className="meal-actions">
                      <button 
                        className="meal-action-btn swap-btn"
                        onClick={(e) => handleSwapMeal(e, mealType)}
                        title="Swap meal"
                        aria-label={`Swap ${mealType}`}
                      >
                        <RefreshCw size={16} />
                      </button>
                      <button 
                        className="meal-action-btn delete-btn"
                        onClick={(e) => handleDeleteMeal(e, mealType)}
                        title="Delete meal"
                        aria-label={`Delete ${mealType}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="meal-slot-content">
                    <div className="meal-slot-info">
                      <span className="meal-slot-type">{mealType}</span>
                      <span className="meal-slot-text">Tap to add a meal</span>
                    </div>
                    <div className="add-meal-btn">
                      <Plus size={20} />
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        
      </Container>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <Container>
          <Row className="text-center g-2">
            <Col>
              <Button
                className="nav-button nav-button-white"
                onClick={() => navigate("/meal-planner")}
              >
                <CalendarDays size={22} className="nav-icon nav-icon-white" />
                <small className="nav-label nav-label-white">Plan Weekly</small>
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

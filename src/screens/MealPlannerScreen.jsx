import React, { useState, useMemo, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { ChevronLeft, ChevronRight, Plus, RefreshCw, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./MealPlannerScreen.css";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const mealTypes = ["Breakfast", "Lunch", "Dinner"];

export default function MealPlannerScreen() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Guest";
  const [weekOffset, setWeekOffset] = useState(0); // 0 = this week, 1 = next week
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [plannedMeals, setPlannedMeals] = useState({});

  // Load planned meals from localStorage
  useEffect(() => {
    const loadMeals = () => {
      const saved = JSON.parse(localStorage.getItem(`${userName}_plannedMeals`) || "{}");
      setPlannedMeals(saved);
    };

    loadMeals();
    
    // Listen for storage changes
    window.addEventListener("storage", loadMeals);
    window.addEventListener("focus", loadMeals);
    
    return () => {
      window.removeEventListener("storage", loadMeals);
      window.removeEventListener("focus", loadMeals);
    };
  }, [userName]);

  // Get the Monday of the current week
  const getMonday = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(d.setDate(diff));
  };

  // Calculate week dates
  const weekDates = useMemo(() => {
    const today = new Date();
    const monday = getMonday(today);
    monday.setDate(monday.getDate() + weekOffset * 7);
    
    return daysOfWeek.map((day, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      return {
        day,
        date: date.getDate(),
        month: date.toLocaleDateString("en-US", { month: "short" }),
        fullDate: date,
        dateKey: date.toISOString(),
        isToday: date.toDateString() === new Date().toDateString(),
      };
    });
  }, [weekOffset]);

  // Get meals for a specific date
  const getMealsForDate = (dateKey) => {
    // Find meals matching this date
    const meals = {};
    Object.keys(plannedMeals).forEach(key => {
      if (key.startsWith(dateKey.split("T")[0])) {
        Object.assign(meals, plannedMeals[key]);
      }
    });
    return meals;
  };

  // Check if a meal exists for a date
  const hasMeal = (dateKey, mealType) => {
    const meals = getMealsForDate(dateKey);
    return !!meals[mealType];
  };

  // Get week label
  const getWeekLabel = () => {
    if (weekOffset === 0) return "This Week";
    if (weekOffset === 1) return "Next Week";
    return `Week of ${weekDates[0].month} ${weekDates[0].date}`;
  };

  // Get short day name
  const getShortDay = (day) => day.substring(0, 3);

  // Get selected day info
  const selectedDayInfo = weekDates[selectedDayIndex];
  const selectedDayMeals = getMealsForDate(selectedDayInfo.dateKey);

  // Format selected day title
  const getSelectedDayTitle = () => {
    const { day, date, month } = selectedDayInfo;
    return `${day}, ${month} ${date}`;
  };

  // Navigate weeks
  const goToPreviousWeek = () => {
    if (weekOffset > 0) {
      setWeekOffset(weekOffset - 1);
    }
  };

  const goToNextWeek = () => {
    if (weekOffset < 1) {
      setWeekOffset(weekOffset + 1);
    }
  };

  // Delete a meal
  const handleDeleteMeal = (e, mealType) => {
    e.stopPropagation();
    const dateKey = selectedDayInfo.dateKey.split("T")[0];
    const updatedMeals = { ...plannedMeals };
    
    // Find and delete the meal
    Object.keys(updatedMeals).forEach(key => {
      if (key.startsWith(dateKey) && updatedMeals[key][mealType]) {
        delete updatedMeals[key][mealType];
      }
    });
    
    localStorage.setItem(`${userName}_plannedMeals`, JSON.stringify(updatedMeals));
    setPlannedMeals(updatedMeals);
  };

  // Swap a meal (navigate to recipe database)
  const handleSwapMeal = (e, mealType) => {
    e.stopPropagation();
    navigate("/recipe-database", {
      state: {
        mealType,
        date: getSelectedDayTitle(),
        fullDate: selectedDayInfo.fullDate.toISOString()
      }
    });
  };

  return (
    <div className="meal-planner-container">
      <Container>
        {/* Header */}
        <div className="meal-planner-header">
          <div className="header-left">
            <Button variant="light" className="back-button" onClick={() => navigate(-1)} aria-label="Go back">
              <ChevronLeft size={20} />
            </Button>
            <h2 className="header-title">Meal Planner</h2>
          </div>
        </div>

        {/* Week Navigation */}
        <div className="week-nav">
          <button 
            className={`week-nav-arrow ${weekOffset === 0 ? "disabled" : ""}`}
            onClick={goToPreviousWeek}
            disabled={weekOffset === 0}
            aria-label="Previous week"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="week-nav-title">{getWeekLabel()}</span>
          <button 
            className={`week-nav-arrow ${weekOffset === 1 ? "disabled" : ""}`}
            onClick={goToNextWeek}
            disabled={weekOffset === 1}
            aria-label="Next week"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Days Selector */}
        <div className="days-selector">
          {weekDates.map((dayInfo, index) => (
            <button
              key={dayInfo.day}
              className={`day-button ${selectedDayIndex === index ? "active" : ""} ${dayInfo.isToday ? "today" : ""}`}
              onClick={() => setSelectedDayIndex(index)}
            >
              <span className="day-short">{getShortDay(dayInfo.day)}</span>
              <span className="day-date">{dayInfo.date}</span>
            </button>
          ))}
        </div>

        {/* Selected Day Title */}
        <h3 className="selected-day-title">{getSelectedDayTitle()}</h3>

        {/* Meal Cards */}
        <div className="meals-grid">
          {mealTypes.map((mealType) => {
            const meal = selectedDayMeals[mealType];
            return (
              <Card key={mealType} className={`meal-slot-card shadow-sm ${meal ? "has-meal" : ""}`}>
                <div className="meal-slot-header">
                  <span className="meal-slot-type">{mealType}</span>
                </div>
                {meal ? (
                  <div 
                    className="meal-added-body"
                    onClick={() => navigate(`/recipe/${meal.id}`)}
                  >
                    <img 
                      src={meal.image} 
                      alt={meal.name}
                      className="meal-added-image"
                    />
                    <div className="meal-added-info">
                      <span className="meal-type-label">{mealType}</span>
                      <p className="meal-added-name">{meal.name}</p>
                    </div>
                    <div className="meal-actions">
                      <button 
                        className="meal-action-btn swap-btn"
                        onClick={(e) => handleSwapMeal(e, mealType)}
                        title="Swap meal"
                        aria-label={`Swap ${mealType}`}
                      >
                        <RefreshCw size={14} />
                      </button>
                      <button 
                        className="meal-action-btn delete-btn"
                        onClick={(e) => handleDeleteMeal(e, mealType)}
                        title="Delete meal"
                        aria-label={`Delete ${mealType}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="meal-slot-body"
                    onClick={() => navigate("/recipe-database", {
                      state: {
                        mealType,
                        date: getSelectedDayTitle(),
                        fullDate: selectedDayInfo.fullDate.toISOString()
                      }
                    })}
                  >
                    <div className="add-meal-circle">
                      <Plus size={24} />
                    </div>
                    <p className="add-meal-text">Add {mealType}</p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Weekly Overview */}
        <div className="weekly-overview">
          <h3 className="weekly-overview-title">Weekly Overview</h3>
          <div className="weekly-grid">
            {weekDates.map((dayInfo, index) => (
              <div 
                key={dayInfo.day} 
                className={`weekly-day-card ${selectedDayIndex === index ? "active" : ""} ${dayInfo.isToday ? "today" : ""}`}
                onClick={() => setSelectedDayIndex(index)}
              >
                <span className="weekly-day-name">{getShortDay(dayInfo.day)}</span>
                <span className="weekly-day-date">{dayInfo.date}</span>
                <div className="weekly-meals-dots">
                  {mealTypes.map((meal) => (
                    <div 
                      key={meal} 
                      className={`meal-dot ${hasMeal(dayInfo.dateKey, meal) ? "filled" : "empty"}`} 
                      title={meal} 
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

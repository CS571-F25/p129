import React, { useState } from "react";
import { ChevronLeft, Search, X, Clock, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import "./RecipeDatabaseScreen.css";

const recipes = [
  {
    id: 1,
    name: "Avocado Toast with Poached Eggs",
    cuisine: "American",
    type: "Breakfast",
    calories: 420,
    time: "15 min",
    image:
      "https://images.unsplash.com/photo-1676471970358-1cff04452e7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
    tags: ["vegetarian"],
  },
  {
    id: 2,
    name: "Mediterranean Quinoa Bowl",
    cuisine: "Mediterranean",
    type: "Lunch",
    calories: 480,
    time: "25 min",
    image:
      "https://images.unsplash.com/photo-1670970146850-c892818f76a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
    tags: ["vegan", "gluten-free"],
  },
  {
    id: 3,
    name: "Grilled Salmon with Vegetables",
    cuisine: "Mediterranean",
    type: "Dinner",
    calories: 620,
    time: "30 min",
    image:
      "https://images.unsplash.com/photo-1759271082074-6cde09f86550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
    tags: ["gluten-free"],
  },
  {
    id: 4,
    name: "Protein Smoothie Bowl",
    cuisine: "American",
    type: "Breakfast",
    calories: 380,
    time: "10 min",
    image:
      "https://images.unsplash.com/photo-1592503469196-3a7880cc2d05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
    tags: ["vegetarian", "gluten-free"],
  },
  {
    id: 5,
    name: "Grilled Chicken & Quinoa",
    cuisine: "Mediterranean",
    type: "Lunch",
    calories: 580,
    time: "35 min",
    image:
      "https://images.unsplash.com/photo-1496074620649-6b1b02e5c1c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
    tags: ["gluten-free"],
  },
  {
    id: 6,
    name: "Pasta Primavera",
    cuisine: "Italian",
    type: "Dinner",
    calories: 560,
    time: "25 min",
    image:
      "https://images.unsplash.com/photo-1593996470434-890a14b11a6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
    tags: ["vegetarian"],
  },
];

export default function RecipeDatabaseScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = recipes.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.cuisine.toLowerCase().includes(q) ||
      r.type.toLowerCase().includes(q) ||
      r.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  return (
    <div className="recipe-database-container">
      <Container>
        {/* HEADER */}
        <div className="recipe-database-header">
          <div className="header-left">
            <Button variant="light" className="back-button" onClick={() => navigate(-1)}>
              <ChevronLeft size={20} />
            </Button>
            <h2 className="header-title">Recipe Database</h2>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="search-container mb-4">
          <div className="search-input-wrapper">
            <Search
              className="search-icon"
              size={18}
            />
            <input
              type="text"
              className="search-input"
              placeholder="Search recipes, cuisine, meal type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery !== "" && (
              <button
                className="search-clear-button"
                onClick={() => setSearchQuery("")}
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* RECIPE GRID */}
        <Row className="g-4">
          {filtered.map((recipe) => (
            <Col md={6} lg={4} key={recipe.id}>
              <Card
                className="recipe-card shadow-sm h-100"
                onClick={() => navigate(`/recipes/${recipe.id}`)}
              >
                <div className="recipe-image-container">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="recipe-image"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x300?text=Recipe";
                    }}
                  />

                  {/* Heart / Favorite Button */}
                  <Button
                    variant="light"
                    className="favorite-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle favorite toggle
                    }}
                  >
                    <Heart size={16} />
                  </Button>
                </div>

                <Card.Body>
                  {/* Tags */}
                  <div className="recipe-tags mb-2">
                    {recipe.tags.map((tag) => (
                      <span key={tag} className="recipe-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h6 className="recipe-title">{recipe.name}</h6>

                  <div className="recipe-meta">
                    <span className="recipe-time">
                      <Clock size={14} className="me-1" />
                      {recipe.time}
                    </span>
                    <span className="recipe-calories">{recipe.calories} kcal</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {filtered.length === 0 && (
          <div className="no-results">
            <p className="no-results-text">No recipes found.</p>
          </div>
        )}
      </Container>
    </div>
  );
}

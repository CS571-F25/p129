import React, { useState, useEffect } from "react";
import { ChevronLeft, Clock, Globe, Youtube } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Button, Spinner, Row, Col } from "react-bootstrap";
import "./RecipeDetailScreen.css";

const API_BASE = "https://www.themealdb.com/api/json/v1/1";

export default function RecipeDetailScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE}/lookup.php?i=${id}`);
        const data = await response.json();
        if (data.meals && data.meals.length > 0) {
          setRecipe(data.meals[0]);
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
      setLoading(false);
    };

    fetchRecipeDetails();
  }, [id]);

  // Extract ingredients and measures from recipe
  const getIngredients = () => {
    if (!recipe) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : "",
        });
      }
    }
    return ingredients;
  };

  // Get YouTube video ID
  const getYoutubeId = () => {
    if (!recipe?.strYoutube) return null;
    const match = recipe.strYoutube.match(/(?:v=|\/)([\w-]{11})/);
    return match ? match[1] : null;
  };

  // Parse instructions into numbered steps
  const getSteps = () => {
    if (!recipe?.strInstructions) return [];
    // Split by sentences (full stops followed by space or newline)
    const sentences = recipe.strInstructions
      .split(/\.(?:\s|\r\n|\n)+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
    return sentences;
  };

  if (loading) {
    return (
      <div className="recipe-detail-container">
        <Container>
          <div className="loading-container">
            <Spinner animation="border" variant="success" />
            <p className="loading-text">Loading recipe...</p>
          </div>
        </Container>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="recipe-detail-container">
        <Container>
          <div className="no-results">
            <p className="no-results-text">Recipe not found.</p>
            <Button variant="success" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const ingredients = getIngredients();
  const youtubeId = getYoutubeId();
  const steps = getSteps();

  return (
    <div className="recipe-detail-container">
      {/* Hero Image */}
      <div className="recipe-hero">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="recipe-hero-image"
        />
        <div className="recipe-hero-overlay" />
        <Button
          variant="light"
          className="back-button-floating"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={24} />
        </Button>
      </div>

      <Container className="recipe-content">
        {/* Title & Tags */}
        <div className="recipe-header">
          <h1 className="recipe-name">{recipe.strMeal}</h1>
          <div className="recipe-tags-row">
            <span className="recipe-tag-pill">{recipe.strCategory}</span>
            <span className="recipe-tag-pill">
              <Globe size={14} className="me-1" />
              {recipe.strArea}
            </span>
          </div>
        </div>

        {/* Ingredients */}
        <div className="recipe-section">
          <h3 className="section-title">Ingredients</h3>
          <div className="ingredients-list">
            {ingredients.map((item, index) => (
              <div key={index} className="ingredient-item">
                <span className="ingredient-measure">{item.measure}</span>
                <span className="ingredient-name">{item.ingredient}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="recipe-section">
          <h3 className="section-title">Instructions</h3>
          <div className="instructions-steps">
            {steps.map((step, index) => (
              <div key={index} className="instruction-step">
                <div className="step-number">{index + 1}</div>
                <p className="step-text">{step}.</p>
              </div>
            ))}
          </div>
        </div>

        {/* YouTube Video */}
        {youtubeId && (
          <div className="recipe-section">
            <h3 className="section-title">
              <Youtube size={20} className="me-2" />
              Video Tutorial
            </h3>
            <div className="video-container">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title="Recipe Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Tags */}
        {recipe.strTags && (
          <div className="recipe-section">
            <h3 className="section-title">Tags</h3>
            <div className="tags-container">
              {recipe.strTags.split(",").map((tag, index) => (
                <span key={index} className="recipe-tag-small">
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}


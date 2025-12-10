import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, Search, X, Heart, MapPin, Carrot, Plus, Check } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Button, Card, Row, Col, Spinner, Modal } from "react-bootstrap";
import "./RecipeDatabaseScreen.css";

const API_BASE = "https://www.themealdb.com/api/json/v1/1";

const categories = [
  "Beef",
  "Chicken",
  "Dessert",
  "Lamb",
  "Miscellaneous",
  "Pasta",
  "Pork",
  "Seafood",
  "Side",
  "Starter",
  "Vegan",
  "Vegetarian",
  "Breakfast",
  "Goat",
];

export default function RecipeDatabaseScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get meal planning context from navigation state
  const mealContext = location.state || null;
  const isAddingMeal = mealContext?.mealType && mealContext?.date;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Beef");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  
  // Filter states
  const [showAreaFilter, setShowAreaFilter] = useState(false);
  const [showIngredientFilter, setShowIngredientFilter] = useState(false);
  const [areas, setAreas] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [areaSearch, setAreaSearch] = useState("");
  const [ingredientSearch, setIngredientSearch] = useState("");
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [activeFilter, setActiveFilter] = useState("category"); // "category", "area", "ingredient"

  // Confirmation dialog state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  // Handle add meal click
  const handleAddMeal = (e, recipe) => {
    e.stopPropagation();
    setSelectedMeal(recipe);
    setShowConfirmModal(true);
  };

  // Confirm adding meal
  const confirmAddMeal = () => {
    // Save meal to localStorage
    const userName = localStorage.getItem("userName") || "Guest";
    const savedMeals = JSON.parse(localStorage.getItem(`${userName}_plannedMeals`) || "{}");
    const dateKey = mealContext.fullDate;
    if (!savedMeals[dateKey]) {
      savedMeals[dateKey] = {};
    }
    savedMeals[dateKey][mealContext.mealType] = {
      id: selectedMeal.idMeal,
      name: selectedMeal.strMeal,
      image: selectedMeal.strMealThumb,
    };
    localStorage.setItem(`${userName}_plannedMeals`, JSON.stringify(savedMeals));
    
    setShowConfirmModal(false);
    setSelectedMeal(null);
    // Navigate back
    navigate(-1);
  };

  // Fetch areas list
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch(`${API_BASE}/list.php?a=list`);
        const data = await response.json();
        setAreas(data.meals || []);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };
    fetchAreas();
  }, []);

  // Fetch ingredients list
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(`${API_BASE}/list.php?i=list`);
        const data = await response.json();
        setIngredients(data.meals || []);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };
    fetchIngredients();
  }, []);

  // Fetch recipes by category
  const fetchByCategory = useCallback(async (category) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/filter.php?c=${category}`);
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    }
    setLoading(false);
  }, []);

  // Fetch recipes by area
  const fetchByArea = async (area) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/filter.php?a=${area}`);
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    }
    setLoading(false);
  };

  // Fetch recipes by ingredient
  const fetchByIngredient = async (ingredient) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/filter.php?i=${ingredient}`);
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    }
    setLoading(false);
  };

  // Search recipes by name
  const searchByName = useCallback(async (query) => {
    if (!query.trim()) {
      setIsSearching(false);
      if (activeFilter === "category") {
        fetchByCategory(selectedCategory);
      } else if (activeFilter === "area" && selectedArea) {
        fetchByArea(selectedArea);
      } else if (activeFilter === "ingredient" && selectedIngredient) {
        fetchByIngredient(selectedIngredient);
      }
      return;
    }
    
    setLoading(true);
    setIsSearching(true);
    try {
      const response = await fetch(`${API_BASE}/search.php?s=${query}`);
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Error searching recipes:", error);
      setRecipes([]);
    }
    setLoading(false);
  }, [selectedCategory, selectedArea, selectedIngredient, activeFilter, fetchByCategory]);

  // Initial load - fetch by category
  useEffect(() => {
    if (!isSearching && activeFilter === "category") {
      fetchByCategory(selectedCategory);
    }
  }, [selectedCategory, isSearching, activeFilter, fetchByCategory]);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        searchByName(searchQuery);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchByName]);

  // Handle category click
  const handleCategoryClick = (category) => {
    setSearchQuery("");
    setIsSearching(false);
    setSelectedCategory(category);
    setSelectedArea(null);
    setSelectedIngredient(null);
    setActiveFilter("category");
  };

  // Handle area selection
  const handleAreaSelect = (area) => {
    setSelectedArea(area);
    setSelectedCategory(null);
    setSelectedIngredient(null);
    setActiveFilter("area");
    setShowAreaFilter(false);
    setAreaSearch("");
    setSearchQuery("");
    setIsSearching(false);
    fetchByArea(area);
  };

  // Handle ingredient selection
  const handleIngredientSelect = (ingredient) => {
    setSelectedIngredient(ingredient);
    setSelectedCategory(null);
    setSelectedArea(null);
    setActiveFilter("ingredient");
    setShowIngredientFilter(false);
    setIngredientSearch("");
    setSearchQuery("");
    setIsSearching(false);
    fetchByIngredient(ingredient);
  };

  // Handle search clear
  const handleClearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    if (activeFilter === "category") {
      fetchByCategory(selectedCategory);
    } else if (activeFilter === "area" && selectedArea) {
      fetchByArea(selectedArea);
    } else if (activeFilter === "ingredient" && selectedIngredient) {
      fetchByIngredient(selectedIngredient);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedArea(null);
    setSelectedIngredient(null);
    setActiveFilter("category");
    setSelectedCategory("Beef");
    fetchByCategory("Beef");
  };

  // Filter areas by search
  const filteredAreas = areas.filter((a) =>
    a.strArea.toLowerCase().includes(areaSearch.toLowerCase())
  );

  // Filter ingredients by search
  const filteredIngredients = ingredients.filter((i) =>
    i.strIngredient.toLowerCase().includes(ingredientSearch.toLowerCase())
  );

  return (
    <div className="recipe-database-container">
      <Container>
        {/* HEADER */}
        <div className="recipe-database-header">
          <div className="header-left">
            <Button variant="light" className="back-button" onClick={() => navigate(-1)} aria-label="Go back">
              <ChevronLeft size={20} />
            </Button>
            <div>
              <h2 className="header-title">
                {isAddingMeal ? `Add ${mealContext.mealType}` : "Recipe Database"}
              </h2>
              {isAddingMeal && (
                <p className="header-subtitle">{mealContext.date}</p>
              )}
            </div>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="search-container mb-3">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Search meals by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search meals by name"
            />
            {searchQuery !== "" && (
              <button
                className="search-clear-button"
                onClick={handleClearSearch}
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* FILTER BUTTONS */}
        <div className="filter-buttons mb-3">
          <div className="filter-btn-group">
            <button
              className={`filter-toggle-btn ${showAreaFilter ? "active" : ""} ${activeFilter === "area" ? "selected" : ""}`}
              onClick={() => {
                setShowAreaFilter(!showAreaFilter);
                setShowIngredientFilter(false);
              }}
            >
              <MapPin size={16} />
              {selectedArea || "Area"}
            </button>
            <button
              className={`filter-toggle-btn ${showIngredientFilter ? "active" : ""} ${activeFilter === "ingredient" ? "selected" : ""}`}
              onClick={() => {
                setShowIngredientFilter(!showIngredientFilter);
                setShowAreaFilter(false);
              }}
            >
              <Carrot size={16} />
              {selectedIngredient || "Ingredient"}
            </button>
            {(selectedArea || selectedIngredient) && (
              <button className="filter-clear-btn" onClick={clearFilters}>
                <X size={14} />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* AREA FILTER DROPDOWN */}
        {showAreaFilter && (
          <div className="filter-dropdown mb-3">
            <div className="filter-dropdown-search">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search areas..."
                value={areaSearch}
                onChange={(e) => setAreaSearch(e.target.value)}
                autoFocus
                aria-label="Search areas"
              />
            </div>
            <div className="filter-dropdown-list">
              {filteredAreas.map((area) => (
                <button
                  key={area.strArea}
                  className={`filter-dropdown-item ${selectedArea === area.strArea ? "active" : ""}`}
                  onClick={() => handleAreaSelect(area.strArea)}
                >
                  {area.strArea}
                </button>
              ))}
              {filteredAreas.length === 0 && (
                <p className="filter-no-results">No areas found</p>
              )}
            </div>
          </div>
        )}

        {/* INGREDIENT FILTER DROPDOWN */}
        {showIngredientFilter && (
          <div className="filter-dropdown mb-3">
            <div className="filter-dropdown-search">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search ingredients..."
                value={ingredientSearch}
                onChange={(e) => setIngredientSearch(e.target.value)}
                autoFocus
                aria-label="Search ingredients"
              />
            </div>
            <div className="filter-dropdown-list">
              {filteredIngredients.map((ing) => (
                <button
                  key={ing.strIngredient}
                  className={`filter-dropdown-item ${selectedIngredient === ing.strIngredient ? "active" : ""}`}
                  onClick={() => handleIngredientSelect(ing.strIngredient)}
                >
                  {ing.strIngredient}
                </button>
              ))}
              {filteredIngredients.length === 0 && (
                <p className="filter-no-results">No ingredients found</p>
              )}
            </div>
          </div>
        )}

        {/* CATEGORY FILTERS */}
        <div className="category-container mb-4">
          <div className="category-scroll">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-btn ${!isSearching && activeFilter === "category" && selectedCategory === category ? "active" : ""}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Active filter indicator */}
        {!isSearching && (activeFilter === "area" || activeFilter === "ingredient") && (
          <p className="search-indicator mb-3">
            Filtering by {activeFilter}: <strong>{selectedArea || selectedIngredient}</strong>
          </p>
        )}

        {/* Search indicator */}
        {isSearching && searchQuery && (
          <p className="search-indicator mb-3">
            Showing results for "<strong>{searchQuery}</strong>"
          </p>
        )}

        {/* LOADING STATE */}
        {loading && (
          <div className="loading-container">
            <Spinner animation="border" variant="success" />
            <p className="loading-text">Loading recipes...</p>
          </div>
        )}

        {/* RECIPE GRID */}
        {!loading && (
          <Row className="g-4">
            {recipes.map((recipe) => (
              <Col xs={6} md={4} lg={3} key={recipe.idMeal}>
                <Card
                  className="recipe-card shadow-sm h-100"
                  onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
                >
                  <div className="recipe-image-container">
                    <img
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      className="recipe-image"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x300?text=Recipe";
                      }}
                    />
                    {isAddingMeal ? (
                      <Button
                        variant="success"
                        className="add-meal-button"
                        onClick={(e) => handleAddMeal(e, recipe)}
                        aria-label={`Add ${recipe.strMeal} to meal plan`}
                      >
                        <Plus size={16} />
                      </Button>
                    ) : (
                      <Button
                        variant="light"
                        className="favorite-button"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        aria-label="Add to favorites"
                      >
                        <Heart size={16} />
                      </Button>
                    )}
                  </div>

                  <Card.Body>
                    {recipe.strCategory && (
                      <span className="recipe-tag">{recipe.strCategory}</span>
                    )}
                    {!recipe.strCategory && activeFilter === "category" && (
                      <span className="recipe-tag">{selectedCategory}</span>
                    )}
                    {!recipe.strCategory && activeFilter === "area" && (
                      <span className="recipe-tag area-tag">{selectedArea}</span>
                    )}
                    {!recipe.strCategory && activeFilter === "ingredient" && (
                      <span className="recipe-tag ingredient-tag">{selectedIngredient}</span>
                    )}
                    <h3 className="recipe-title">{recipe.strMeal}</h3>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {!loading && recipes.length === 0 && (
          <div className="no-results">
            <p className="no-results-text">No recipes found.</p>
          </div>
        )}
      </Container>

      {/* Confirmation Modal */}
      <Modal 
        show={showConfirmModal} 
        onHide={() => setShowConfirmModal(false)}
        centered
      >
        <Modal.Body className="confirm-modal-body">
          {selectedMeal && (
            <>
              <img 
                src={selectedMeal.strMealThumb} 
                alt={selectedMeal.strMeal}
                className="confirm-modal-image"
              />
              <h3 className="confirm-modal-title">Add to Meal Plan?</h3>
              <p className="confirm-modal-text">
                Confirm to add <strong>{selectedMeal.strMeal}</strong> to {mealContext?.date} {mealContext?.mealType}?
              </p>
              <div className="confirm-modal-buttons">
                <Button 
                  variant="outline-secondary" 
                  onClick={() => setShowConfirmModal(false)}
                  className="confirm-modal-btn"
                >
                  Cancel
                </Button>
                <Button 
                  variant="success" 
                  onClick={confirmAddMeal}
                  className="confirm-modal-btn"
                >
                  <Check size={18} className="me-1" />
                  Confirm
                </Button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

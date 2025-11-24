import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import "./PersonalInfoScreen.css";

export default function PersonalInfoScreen() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    activityLevel: "",
    dietaryPrefs: {
      vegan: false,
      vegetarian: false,
      glutenFree: false,
      allergies: false,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="personal-info-container">
      <Container>
        {/* Header */}
        <div className="personal-info-header">
          <div className="header-left">
            <Button variant="light" className="back-button" onClick={handleBack}>
              <ChevronLeft size={20} />
            </Button>
            <h2 className="header-title">Personal Information</h2>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="personal-info-form">
        {/* Full Name */}
        <div className="mb-4">
          <label htmlFor="name" className="form-label fw-semibold">
            Full Name
          </label>
          <input
            id="name"
            className="form-control"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Age, Weight, Height */}
        <div className="row g-4 mb-4">
          <div className="col-4">
            <label htmlFor="age" className="form-label fw-semibold">
              Age
            </label>
            <input
              id="age"
              type="number"
              className="form-control"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder="25"
              required
            />
          </div>

          <div className="col-4">
            <label htmlFor="weight" className="form-label fw-semibold">
              Weight (kg)
            </label>
            <input
              id="weight"
              type="number"
              className="form-control"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              placeholder="70"
              required
            />
          </div>

          <div className="col-4">
            <label htmlFor="height" className="form-label fw-semibold">
              Height (cm)
            </label>
            <input
              id="height"
              type="number"
              className="form-control"
              value={formData.height}
              onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              placeholder="170"
              required
            />
          </div>
        </div>

        {/* Activity Level */}
        <div className="mb-4">
          <label htmlFor="activity" className="form-label fw-semibold">
            Activity Level
          </label>
          <select
            id="activity"
            className="form-select"
            value={formData.activityLevel}
            onChange={(e) =>
              setFormData({ ...formData, activityLevel: e.target.value })
            }
            required
          >
            <option value="">Select your activity level</option>
            <option value="low">Low - Little or no exercise</option>
            <option value="medium">Medium - Exercise 3–4 times/week</option>
            <option value="high">High - Exercise 6–7 times/week</option>
          </select>
        </div>

        {/* Dietary Preferences */}
        <div className="mb-4">
          <label className="form-label fw-semibold">Dietary Preferences</label>

          <div className="form-check mb-2">
            <input
              id="vegan"
              type="checkbox"
              className="form-check-input"
              checked={formData.dietaryPrefs.vegan}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  dietaryPrefs: {
                    ...formData.dietaryPrefs,
                    vegan: e.target.checked,
                  },
                })
              }
            />
            <label className="form-check-label" htmlFor="vegan">
              Vegan
            </label>
          </div>

          <div className="form-check mb-2">
            <input
              id="vegetarian"
              type="checkbox"
              className="form-check-input"
              checked={formData.dietaryPrefs.vegetarian}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  dietaryPrefs: {
                    ...formData.dietaryPrefs,
                    vegetarian: e.target.checked,
                  },
                })
              }
            />
            <label className="form-check-label" htmlFor="vegetarian">
              Vegetarian
            </label>
          </div>

          <div className="form-check mb-2">
            <input
              id="glutenFree"
              type="checkbox"
              className="form-check-input"
              checked={formData.dietaryPrefs.glutenFree}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  dietaryPrefs: {
                    ...formData.dietaryPrefs,
                    glutenFree: e.target.checked,
                  },
                })
              }
            />
            <label className="form-check-label" htmlFor="glutenFree">
              Gluten-Free
            </label>
          </div>

          <div className="form-check mb-2">
            <input
              id="allergies"
              type="checkbox"
              className="form-check-input"
              checked={formData.dietaryPrefs.allergies}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  dietaryPrefs: {
                    ...formData.dietaryPrefs,
                    allergies: e.target.checked,
                  },
                })
              }
            />
            <label className="form-check-label" htmlFor="allergies">
              Food Allergies
            </label>
          </div>
        </div>

        {/* Submit */}
        <Button type="submit" variant="success" className="submit-button">
          Complete Setup
        </Button>
      </form>
      </Container>
    </div>
  );
}

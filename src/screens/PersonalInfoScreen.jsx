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
    gender: "",
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
    // Save user data to localStorage
    localStorage.setItem("userName", formData.name);
    localStorage.setItem("userInfo", JSON.stringify(formData));
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
              min="1"
              max="120"
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
              min="1"
              max="500"
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
              min="30"
              max="300"
              required
            />
          </div>
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="form-label fw-semibold">Gender</label>
          <div className="d-flex gap-4">
            <div className="form-check form-check-inline">
              <input
                id="male"
                type="radio"
                name="gender"
                className="form-check-input"
                value="male"
                checked={formData.gender === "male"}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                required
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                id="female"
                type="radio"
                name="gender"
                className="form-check-input"
                value="female"
                checked={formData.gender === "female"}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                required
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
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
            <option value="sedentary">Sedentary - Little or no exercise</option>
            <option value="lightly_active">Lightly Active - Exercise 1–3 times/week</option>
            <option value="moderately_active">Moderately Active - Exercise 3–5 times/week</option>
            <option value="very_active">Very Active - Exercise 6–7 times/week</option>
            <option value="extra_active">Extra Active - Very intense exercise daily</option>
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

import { Routes, Route, Navigate } from "react-router-dom";
import WelcomeScreen from "./screens/WelcomeScreen";
import PersonalInfoScreen from "./screens/PersonalInfoScreen";
import DashboardScreen from "./screens/DashboardScreen";
import MealPlannerScreen from "./screens/MealPlannerScreen";
import RecipeDatabaseScreen from "./screens/RecipeDatabaseScreen";
import RecipeDetailScreen from "./screens/RecipeDetailScreen";
import ShoppingListScreen from "./screens/ShoppingListScreen";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/personal-info" element={<PersonalInfoScreen />} />
      <Route path="/dashboard" element={<DashboardScreen />} />
      <Route path="/meal-planner" element={<MealPlannerScreen />} />
      <Route path="/recipe-database" element={<RecipeDatabaseScreen />} />
      <Route path="/recipe/:id" element={<RecipeDetailScreen />} />
      <Route path="/shopping-list" element={<ShoppingListScreen />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

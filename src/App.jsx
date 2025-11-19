import { Routes, Route, Navigate } from 'react-router-dom'
import WelcomeScreen from './screens/WelcomeScreen'
import DashboardScreen from './screens/DashboardScreen'
import MealPlannerScreen from './screens/MealPlannerScreen'
import PersonalInfoScreen from './screens/PersonalInfoScreen'
import RecipeDatabaseScreen from './screens/RecipeDatabaseScreen'
import ShoppingListScreen from './screens/ShoppingListScreen'

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/dashboard" element={<DashboardScreen />} />
      <Route path="/meal-planner" element={<MealPlannerScreen />} />
      <Route path="/personal-info" element={<PersonalInfoScreen />} />
      <Route path="/recipe-database" element={<RecipeDatabaseScreen />} />
      <Route path="/shopping-list" element={<ShoppingListScreen />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App

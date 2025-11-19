import { StrictMode } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/p129">
      <App />
    </BrowserRouter>
  </StrictMode>
)

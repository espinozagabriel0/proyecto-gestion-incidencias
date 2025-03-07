import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GestionProvider } from './context/GestionContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GestionProvider>
        <App />
      </GestionProvider>
    </BrowserRouter>
  </StrictMode>,
)

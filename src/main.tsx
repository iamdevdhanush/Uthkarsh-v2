import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/globals.css'
import App from './App'
import { AmbientGrid } from './components/ui/AmbientGrid'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AmbientGrid />
      <App />
    </BrowserRouter>
  </StrictMode>,
)

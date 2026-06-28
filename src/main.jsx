import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Ya lo tenías importado 👍
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* 1. Añade esta etiqueta de apertura */}
      <App />
    </BrowserRouter> {/* 2. Añade esta etiqueta de cierre */}
  </StrictMode>,
)
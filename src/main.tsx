import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { getRouter } from './router'
import './styles/app.css'

// Crea il router
const router = getRouter()

// Elemento root nel DOM
const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Elemento root non trovato nel DOM')
}

// Rendering dell'app
try {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
  console.log('App montata con successo')
} catch (error) {
  console.error('Errore durante il mounting:', error)
  rootElement.innerHTML = `
    <div style="padding: 20px; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; margin: 20px; font-family: sans-serif;">
      <h2 style="margin-top: 0;">Si è verificato un errore critico</h2>
      <p>L'applicazione non è riuscita ad avviarsi correttamente.</p>
      <pre style="white-space: pre-wrap; font-size: 12px;">${error instanceof Error ? error.message : String(error)}</pre>
      <button onclick="window.location.reload()" style="padding: 8px 16px; background: #721c24; color: white; border: none; border-radius: 4px; cursor: pointer;">Ricarica pagina</button>
    </div>
  `
}

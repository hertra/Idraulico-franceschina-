import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { getRouter } from './router'
import './styles/app.css'

const router = getRouter()

const rootElement = document.getElementById('root')!

const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ConvexQueryClient } from '@convex-dev/react-query'
import { ConvexProvider } from 'convex/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'
import './styles/app.css'

// 1. Configurazione Convex
const CONVEX_URL = import.meta.env.VITE_CONVEX_URL || 'https://proper-porpoise-326.convex.cloud'
const convexQueryClient = new ConvexQueryClient(CONVEX_URL)

// 2. Configurazione React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKeyHashFn: convexQueryClient.hashFn(),
      queryFn: convexQueryClient.queryFn(),
    },
  },
})
convexQueryClient.connect(queryClient)

// 3. Configurazione Router
const router = createRouter({
  routeTree,
  context: { queryClient },
})

// 4. Avvio dell'App
const rootElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <ConvexProvider client={convexQueryClient.convexClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ConvexProvider>
  </React.StrictMode>
)

import { createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConvexQueryClient } from '@convex-dev/react-query'
import { ConvexProvider } from 'convex/react'
import { routeTree } from './routeTree.gen'
import React from 'react'

export function getRouter() {
  const CONVEX_URL = import.meta.env.VITE_CONVEX_URL || 'https://proper-porpoise-326.convex.cloud'
  console.log('Router initializing with Convex URL:', CONVEX_URL)
  
  const convexQueryClient = new ConvexQueryClient(CONVEX_URL)

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryKeyHashFn: convexQueryClient.hashFn(),
        queryFn: convexQueryClient.queryFn(),
        staleTime: 5 * 60 * 1000,
      },
    },
  })
  convexQueryClient.connect(queryClient)

  const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    context: { queryClient },
    scrollRestoration: true,
    defaultErrorComponent: ({ error }) => (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Errore di inizializzazione</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm text-left overflow-auto max-w-2xl mx-auto">
          {error instanceof Error ? error.message : String(error)}
        </pre>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Ricarica Pagina
        </button>
      </div>
    ),
    Wrap: ({ children }) => (
      <ConvexProvider client={convexQueryClient.convexClient}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ConvexProvider>
    ),
  })

  return router
}

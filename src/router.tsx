import { createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConvexQueryClient } from '@convex-dev/react-query'
import { ConvexProvider } from 'convex/react'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const CONVEX_URL = import.meta.env.VITE_CONVEX_URL
  
  // Hardcoded production fallback for Vercel
  const finalConvexUrl = CONVEX_URL || 'https://tasty-mink-675.convex.cloud'
  
  const convexQueryClient = new ConvexQueryClient(finalConvexUrl)

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
        <h2 className="text-2xl font-bold text-red-600 mb-4">Errore di caricamento</h2>
        <p className="mb-4">Il sito sta riscontrando problemi di connessione al database.</p>
        <pre className="bg-gray-100 p-4 rounded text-xs text-left overflow-auto max-w-2xl mx-auto mb-6">
          {error instanceof Error ? error.message : String(error)}
        </pre>
        <button 
          onClick={() => window.location.reload()} 
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
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

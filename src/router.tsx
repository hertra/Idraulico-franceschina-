import { createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConvexQueryClient } from '@convex-dev/react-query'
import { ConvexProvider } from 'convex/react'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const CONVEX_URL = (import.meta as any).env.VITE_CONVEX_URL || 'https://proper-porpoise-326.convex.cloud'
  
  const convexQueryClient = new ConvexQueryClient(CONVEX_URL)

  const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryKeyHashFn: convexQueryClient.hashFn(),
        queryFn: convexQueryClient.queryFn(),
        gcTime: 5000,
        retry: 1,
      },
    },
  })
  convexQueryClient.connect(queryClient)

  const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: ({ error }) => (
      <div className="p-4 bg-red-50 text-red-700 rounded-lg m-4">
        <h2 className="font-bold">Si è verificato un errore</h2>
        <p className="text-sm">{error.message}</p>
        <button onClick={() => window.location.reload()} className="mt-2 text-xs underline">Ricarica pagina</button>
      </div>
    ),
    defaultNotFoundComponent: () => (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-6xl font-black text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Pagina non trovata</h2>
        <a href="/" className="px-6 py-2 bg-blue-600 text-white rounded-xl">Torna alla Home</a>
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

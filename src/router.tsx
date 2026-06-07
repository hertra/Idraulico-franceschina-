import { createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConvexQueryClient } from '@convex-dev/react-query'
import { ConvexProvider } from 'convex/react'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const CONVEX_URL = import.meta.env.VITE_CONVEX_URL
  
  if (!CONVEX_URL && import.meta.env.PROD) {
    return createRouter({
      routeTree,
      defaultComponent: () => (
        <div className="p-20 text-center font-sans">
          <h1 className="text-3xl font-black text-red-600 mb-4">Configurazione Mancante</h1>
          <p className="text-lg text-gray-600 mb-8">
            Devi configurare la variabile d'ambiente <strong>VITE_CONVEX_URL</strong> su Vercel 
            per far funzionare il database.
          </p>
          <div className="bg-gray-100 p-6 rounded-2xl text-left max-w-xl mx-auto border border-gray-200">
            <p className="font-bold mb-2">Istruzioni:</p>
            <ol className="list-decimal ml-5 space-y-2 text-sm">
              <li>Vai sulla dashboard di Vercel</li>
              <li>Impostazioni (Settings) &gt; Environment Variables</li>
              <li>Aggiungi <strong>VITE_CONVEX_URL</strong></li>
              <li>Incolla l'URL del tuo backend Convex</li>
              <li>Riesegui il deployment</li>
            </ol>
          </div>
        </div>
      )
    })
  }

  const finalConvexUrl = CONVEX_URL || 'https://3210-i8pkksvjk3hz9eonqq8km.app.cto.new'
  
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

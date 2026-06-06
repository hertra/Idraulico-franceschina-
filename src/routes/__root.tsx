import {
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import * as React from 'react'
import type { QueryClient } from '@tanstack/react-query'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
       <h1 className="text-6xl font-black text-blue-600 mb-4">404</h1>
       <h2 className="text-2xl font-bold mb-4 text-gray-900">Pagina non trovata</h2>
       <p className="text-gray-600 mb-8 max-w-md">La pagina che stai cercando non esiste o è stata spostata.</p>
       <a href="/" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg">
         Torna alla Home
       </a>
    </div>
  ),
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-blue-600">Caricamento...</div>}>
      <Outlet />
    </React.Suspense>
  )
}

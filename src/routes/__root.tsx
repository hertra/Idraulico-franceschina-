import {
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import * as React from 'react'
import type { QueryClient } from '@tanstack/react-query'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: RootComponent,
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
       <h1 className="text-6xl font-black text-blue-600 mb-4">404</h1>
       <h2 className="text-2xl font-bold mb-4 text-gray-900">Pagina non trovata</h2>
       <a href="/" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl">
         Torna alla Home
       </a>
    </div>
  ),
})

function RootComponent() {
  return (
    <React.Suspense fallback={<div className="p-10 text-center font-bold text-blue-600">Caricamento...</div>}>
      <Outlet />
    </React.Suspense>
  )
}

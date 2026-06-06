import { createFileRoute, Link } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { convexQuery } from '@convex-dev/react-query'
import { api } from '../../convex/_generated/api'

export const Route = createFileRoute('/servizi/')({
  component: ServicePage,
})

function ServicePage() {
  const { serviceSlug } = Route.useParams()
  const { data: service } = useSuspenseQuery(
    convexQuery(api.services.getBySlug, { slug: serviceSlug })
  )

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center bg-white p-8 rounded-3xl shadow-xl max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Servizio non trovato</h1>
          <p className="text-gray-600 mb-6">Ci scusiamo, ma il servizio richiesto non è disponibile.</p>
          <Link to="/" className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
            Torna alla Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-6 sticky top-0 z-50 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-all font-semibold group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Torna alla Home
          </Link>
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-lg font-bold text-blue-900 leading-tight">Idraulica Franceschina</span>
            <span className="text-xs text-gray-500 font-medium uppercase tracking-widest">Carlo Antonio • Milano</span>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 lg:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left relative z-10">
              <div className="w-20 h-20 bg-white rounded-3xl shadow-2xl shadow-blue-100 flex items-center justify-center mb-10 border border-blue-50">
                <span className="text-4xl">🔧</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight">
                {service.title} <span className="text-blue-600">a Milano</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl leading-relaxed font-medium">
                {service.fullDescription}
              </p>
            </div>
            {/* Abstract Background Shape */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-10 tracking-tight">Cosa include il nostro servizio:</h2>
                <ul className="space-y-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-emerald-50 transition-colors">
                      <div className="mt-1 bg-emerald-100 text-emerald-600 p-1.5 rounded-full shrink-0 flex items-center justify-center">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <span className="text-lg text-gray-700 font-semibold leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-16 p-8 lg:p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 relative overflow-hidden group">
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-5 text-gray-900">Perché scegliere Idraulica Franceschina?</h3>
                    <p className="text-gray-600 leading-relaxed text-lg font-medium">
                      Siamo artigiani che lavorano con passione da oltre 20 anni. Non siamo un call center, ma una ditta individuale locale che ci mette la faccia. Garantiamo pulizia, onestà nei prezzi e interventi rapidi in tutta Milano.
                    </p>
                  </div>
                  <div className="absolute top-0 right-0 p-8 text-6xl opacity-10 grayscale group-hover:scale-110 transition-transform duration-500">🏆</div>
                </div>
              </div>

              <div className="lg:sticky lg:top-32 h-fit">
                <div className="bg-blue-600 rounded-[2.5rem] p-10 lg:p-12 text-white shadow-2xl shadow-blue-200 relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-3xl font-extrabold mb-5 leading-tight">Prenota ora il tuo intervento</h3>
                    <p className="text-blue-100 mb-10 text-lg font-medium leading-relaxed">Hai bisogno di assistenza immediata per {service.title.toLowerCase()}? Chiamaci o scrivici su WhatsApp per una risposta in tempo reale.</p>
                    
                    <div className="space-y-5">
                      <a href="tel:+393394464235" className="flex items-center justify-center gap-3 w-full py-5 bg-white text-blue-600 font-extrabold rounded-2xl hover:scale-[1.02] transition-all shadow-xl text-lg">
                        <span className="text-2xl">📞</span> Chiama il 339 446 4235
                      </a>
                      <a href="https://wa.me/393394464235" className="flex items-center justify-center gap-3 w-full py-5 bg-emerald-500 text-white font-extrabold rounded-2xl hover:scale-[1.02] transition-all shadow-xl text-lg">
                        <span className="text-2xl">💬</span> WhatsApp Rapido
                      </a>
                    </div>

                    <div className="mt-10 flex items-center justify-center gap-3 text-sm text-blue-200 font-bold bg-blue-700/50 py-3 rounded-full">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400"></div>
                      Disponibile ora a Milano e dintorni
                    </div>
                  </div>
                  {/* Decorative element */}
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-tl-full -mr-10 -mb-10"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 font-medium tracking-wide">&copy; {new Date().getFullYear()} Idraulica Franceschina • Milano • P.IVA: 11181820150</p>
        </div>
      </footer>
    </div>
  )
}

import { createFileRoute, Link } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { convexQuery } from '@convex-dev/react-query'
import { api } from '../../convex/_generated/api'
import { Phone, ArrowLeft, CheckCircle2, MessageCircle, Clock, Droplets, Thermometer, Bath, Wrench, Home as HomeIcon } from 'lucide-react'

export const Route = createFileRoute('/servizi/$serviceSlug')({
  component: ServiceDetail,
})

const IconMap: Record<string, React.ReactNode> = {
  Clock: <Clock className="w-12 h-12 text-blue-600" />,
  Droplets: <Droplets className="w-12 h-12 text-blue-600" />,
  Thermometer: <Thermometer className="w-12 h-12 text-blue-600" />,
  Bath: <Bath className="w-12 h-12 text-blue-600" />,
  Wrench: <Wrench className="w-12 h-12 text-blue-600" />,
  Home: <HomeIcon className="w-12 h-12 text-blue-600" />,
}

function ServiceDetail() {
  const { serviceSlug } = Route.useParams()
  const { data: service } = useSuspenseQuery(convexQuery(api.services.getBySlug, { slug: serviceSlug }))

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Servizio non trovato</h1>
          <Link to="/" className="text-blue-600 hover:underline">Torna alla home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" /> Torna alla Home
          </Link>
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-lg font-bold text-blue-900 leading-tight">Idraulica Franceschina</span>
            <span className="text-xs text-gray-500 font-medium uppercase tracking-widest">Carlo Antonio • Milano</span>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-linear-to-b from-blue-50 to-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="w-20 h-20 bg-white rounded-3xl shadow-xl shadow-blue-100 flex items-center justify-center mb-8">
                {IconMap[service.iconName] || <Wrench className="w-12 h-12 text-blue-600" />}
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                {service.title} <span className="text-blue-600">a Milano</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
                {service.fullDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Cosa include il nostro servizio:</h2>
                <ul className="space-y-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="mt-1 bg-emerald-100 text-emerald-600 p-1 rounded-full shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span className="text-lg text-gray-700 font-medium leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-12 p-8 bg-gray-50 rounded-3xl border border-gray-100">
                  <h3 className="text-xl font-bold mb-4">Perché scegliere Idraulica Franceschina?</h3>
                  <p className="text-gray-600 leading-relaxed mb-0">
                    Siamo artigiani che lavorano con passione da oltre 20 anni. Non siamo un call center, ma una ditta individuale locale che ci mette la faccia. Garantiamo pulizia, onestà nei prezzi e interventi rapidi in tutta Milano.
                  </p>
                </div>
              </div>

              <div className="lg:sticky lg:top-24 h-fit">
                <div className="bg-blue-600 rounded-3xl p-8 lg:p-10 text-white shadow-2xl shadow-blue-200">
                  <h3 className="text-2xl font-extrabold mb-4 leading-tight">Prenota ora il tuo intervento</h3>
                  <p className="text-blue-100 mb-8">Hai bisogno di assistenza immediata per {service.title.toLowerCase()}? Chiamaci o scrivici su WhatsApp per una risposta in tempo reale.</p>
                  
                  <div className="space-y-4">
                    <a href="tel:+393394464235" className="flex items-center justify-center gap-3 w-full py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all shadow-lg">
                      <Phone className="w-6 h-6" /> Chiama il 339 446 4235
                    </a>
                    <a href="https://wa.me/393394464235" className="flex items-center justify-center gap-3 w-full py-4 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-lg">
                      <MessageCircle className="w-6 h-6" /> WhatsApp Rapido
                    </a>
                  </div>
                  
                  <div className="mt-8 flex items-center justify-center gap-2 text-sm text-blue-200 font-medium">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                    Disponibile ora a Milano e dintorni
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Idraulica Franceschina • Milano • P.IVA: 11181820150</p>
        </div>
      </footer>
    </div>
  )
}

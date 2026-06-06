import { createFileRoute, Link } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { convexQuery } from '@convex-dev/react-query'
import { api } from '../../convex/_generated/api'
import { useState } from 'react'
import { useMutation } from 'convex/react'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const { data: services } = useSuspenseQuery(convexQuery(api.services.list, {}))
  const createLead = useMutation(api.leads.create)
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createLead(formData)
    setIsSubmitted(true)
    setFormData({ name: '', phone: '', message: '' })
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-white">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm font-medium">
          <div className="flex items-center gap-4">
            <span>📞 <a href="tel:+393394464235">+39 339 446 4235</a></span>
            <span className="hidden sm:inline">📍 Via Rubens 20, Milano</span>
          </div>
          <div className="mt-1 sm:mt-0 uppercase tracking-wider">
            Pronto Intervento 24/7
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-blue-900 leading-tight">Idraulica Franceschina</span>
            <span className="text-xs text-gray-500 font-medium tracking-widest uppercase">Carlo Antonio • Milano</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <a href="#servizi" className="hover:text-blue-600 transition-colors">Servizi</a>
            <a href="#contatti" className="px-5 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              Richiedi Preventivo
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-32 lg:pb-40 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:w-2/3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-6">
              Disponibile Ora a Milano
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
              Idraulico Professionista <br />
              <span className="text-blue-600">al tuo servizio.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
              Interventi rapidi, certificati e trasparenti a Milano. Esperienza artigiana al giusto prezzo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+393394464235" className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
                Chiamata d'Emergenza
              </a>
              <a href="https://wa.me/393394464235" className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 text-white text-lg font-bold rounded-xl hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-200">
                WhatsApp Rapido
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="servizi" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">I Nostri Servizi</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link 
                key={index} 
                to="/servizi/$serviceSlug"
                params={{ serviceSlug: service.slug }}
                className="p-8 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50 transition-all group bg-white text-left block"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                <div className="text-blue-600 font-bold text-sm">
                  Scopri di più →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contatti" className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-extrabold mb-8 text-center">Richiedi Preventivo</h2>
            {isSubmitted ? (
              <div className="text-center py-10">
                <p className="text-2xl font-bold text-emerald-600">Richiesta Inviata!</p>
                <p className="text-gray-600 mt-2">Ti contatteremo a breve.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input required placeholder="Nome" className="w-full p-4 rounded-xl border border-gray-200" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input required placeholder="Telefono" className="w-full p-4 rounded-xl border border-gray-200" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                <textarea required placeholder="Messaggio" rows={4} className="w-full p-4 rounded-xl border border-gray-200" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                <button type="submit" className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700">Invia</button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-white border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Dove Trovarci</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            La nostra sede si trova in <strong>Via Rubens 20, Milano</strong>.<br />
            Operiamo in zona De Angeli, San Siro, Fiera e in tutta la città.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <a 
               href="https://www.google.com/maps/dir/?api=1&destination=Via+Peter+Paul+Rubens+20+20148+Milano+MI" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg"
             >
               📍 Apri in Google Maps
             </a>
             <a href="tel:+393394464235" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all">
               📞 Chiama per Informazioni
             </a>
          </div>
          <div className="mt-12 p-8 bg-blue-50 rounded-3xl inline-block text-left border border-blue-100">
            <h3 className="font-bold text-blue-900 mb-2">Orari e Disponibilità</h3>
            <ul className="text-blue-800 space-y-1">
              <li>✅ Lunedì - Domenica: <strong>24 ore su 24</strong></li>
              <li>📍 Sede: Via Rubens 20, 20148 Milano</li>
              <li>⚡ Pronto Intervento: Arrivo in 60-90 min</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 text-center">
        <p>&copy; {new Date().getFullYear()} Idraulica Franceschina. Tutti i diritti riservati.</p>
      </footer>
    </div>
  )
}

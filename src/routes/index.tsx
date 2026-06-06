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
    try {
      await createLead(formData)
      setIsSubmitted(true)
      setFormData({ name: '', phone: '', message: '' })
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (err) {
      alert("Errore nell'invio. Per favore chiamaci direttamente.")
    }
  }

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-white">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm font-medium text-center sm:text-left">
          <div className="flex items-center gap-4">
            <span>📞 <a href="tel:+393394464235" className="hover:underline">+39 339 446 4235</a></span>
            <span className="hidden sm:inline">📍 Via Rubens 20, Milano</span>
          </div>
          <div className="mt-1 sm:mt-0 uppercase tracking-wider font-bold">
            Pronto Intervento 24/7
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xl font-black text-blue-900 leading-tight">Idraulica Franceschina</span>
            <span className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase">Artigiano Antonio • Milano</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-tight">
            <a href="#servizi" className="hover:text-blue-600 transition-colors">Servizi</a>
            <a href="#dove-siamo" className="hover:text-blue-600 transition-colors">Dove Siamo</a>
            <a href="#contatti" className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
              Contattaci
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-32 lg:pb-40 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:w-2/3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-black uppercase mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Disponibile Ora a Milano
            </div>
            <h1 className="text-5xl lg:text-8xl font-black text-gray-900 tracking-tighter mb-8 leading-[0.95]">
              Idraulico <br />
              <span className="text-blue-600">Professionista.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl leading-relaxed font-medium">
              Interventi rapidi, certificati e trasparenti a Milano. Oltre 20 anni di esperienza artigiana al tuo servizio.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <a href="tel:+393394464235" className="flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 text-white text-lg font-black rounded-2xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 hover:-translate-y-1">
                📞 Chiama Ora
              </a>
              <a href="https://wa.me/393394464235" className="flex items-center justify-center gap-3 px-10 py-5 bg-emerald-500 text-white text-lg font-black rounded-2xl hover:bg-emerald-600 transition-all shadow-2xl shadow-emerald-200 hover:-translate-y-1">
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="servizi" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tighter">I Nostri Servizi</h2>
              <p className="text-lg text-gray-500 font-medium">Soluzioni complete per ogni esigenza idraulica, civile e industriale.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link 
                key={index} 
                to="/servizi/$serviceSlug"
                params={{ serviceSlug: service.slug }}
                className="p-10 rounded-[2.5rem] border border-gray-100 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-50 transition-all group bg-white text-left block relative overflow-hidden"
              >
                <div className="text-4xl mb-6">🔧</div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">{service.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed mb-8">{service.description}</p>
                <div className="flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-widest">
                  Dettagli <span className="group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contatti" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] p-8 lg:p-20 shadow-2xl shadow-blue-100 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-6xl font-black mb-6 tracking-tighter leading-none">Richiedi un <br/><span className="text-blue-600">Preventivo Gratuito</span></h2>
              <p className="text-xl text-gray-500 font-medium mb-12">Compila il modulo o usa i tasti rapidi. Rispondiamo in meno di 30 minuti.</p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 text-xl font-bold">📍</div>
                   <div>
                     <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Sede</p>
                     <p className="text-lg font-bold">Via Rubens 20, Milano</p>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 text-xl font-bold">⚡</div>
                   <div>
                     <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Pronto Intervento</p>
                     <p className="text-lg font-bold">H24 - 7 giorni su 7</p>
                   </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 lg:p-12 rounded-[2rem]">
              {isSubmitted ? (
                <div className="text-center py-10">
                  <div className="text-5xl mb-6">✅</div>
                  <p className="text-2xl font-black text-gray-900">Richiesta Inviata!</p>
                  <p className="text-gray-500 font-medium mt-2">Ti contatteremo sul numero indicato.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input required placeholder="Il tuo nome" className="w-full p-5 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-blue-600 outline-none font-medium" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  <input required placeholder="Numero di telefono" className="w-full p-5 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-blue-600 outline-none font-medium" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  <textarea required placeholder="Descrivi brevemente il problema" rows={4} className="w-full p-5 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-blue-600 outline-none font-medium" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                  <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 uppercase tracking-widest text-sm">Invia Richiesta</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="dove-siamo" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-6xl font-black text-gray-900 mb-8 tracking-tighter">Dove Operiamo</h2>
          <p className="text-xl text-gray-500 font-medium mb-12 max-w-3xl mx-auto">
            Copriamo tutta Milano e provincia. Specializzati nelle zone <strong>San Siro, De Angeli, Fiera, Pagano e Wagner</strong>.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
             <a 
               href="https://www.google.com/maps/dir/?api=1&destination=Via+Peter+Paul+Rubens+20+20148+Milano+MI" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white border-2 border-gray-100 text-gray-900 font-black rounded-2xl hover:border-blue-600 hover:text-blue-600 transition-all shadow-lg text-lg"
             >
               📍 Apri Navigatore
             </a>
             <a href="tel:+393394464235" className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-blue-50 text-blue-600 font-black rounded-2xl hover:bg-blue-100 transition-all text-lg">
               📞 339 446 4235
             </a>
          </div>
          
          <div className="p-10 bg-blue-600 rounded-[3rem] text-white inline-block text-left relative overflow-hidden shadow-2xl shadow-blue-200 max-w-xl w-full">
            <h3 className="text-2xl font-black mb-6 relative z-10">Dati Aziendali</h3>
            <ul className="space-y-4 font-bold relative z-10">
              <li className="flex justify-between border-b border-white/10 pb-2"><span>Sede Legale:</span> <span className="text-blue-100">Via Rubens 20, Milano</span></li>
              <li className="flex justify-between border-b border-white/10 pb-2"><span>P. IVA:</span> <span className="text-blue-100">11181820150</span></li>
              <li className="flex justify-between"><span>Disponibilità:</span> <span className="text-emerald-300">24/7 Sempre Aperti</span></li>
            </ul>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4">
           <div className="text-2xl font-black mb-4">Idraulica Franceschina</div>
           <p className="text-gray-500 font-medium mb-8">Il tuo idraulico di fiducia a Milano dal 2004.</p>
           <p className="text-sm text-gray-600 font-bold uppercase tracking-[0.3em]">&copy; {new Date().getFullYear()} Tutti i diritti riservati.</p>
        </div>
      </footer>

      {/* WhatsApp Float */}
      <a href="https://wa.me/393394464235" className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center text-3xl shadow-2xl hover:scale-110 transition-transform animate-bounce">
        💬
      </a>
    </div>
  )
}

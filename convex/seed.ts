import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

export const seed = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    // Clear existing services
    const existing = await ctx.db.query("services").collect();
    for (const doc of existing) {
      await ctx.db.delete("services", doc._id);
    }

    const services = [
      {
        slug: "pronto-intervento",
        title: "Pronto Intervento",
        description: "Assistenza rapida per perdite d'acqua, allagamenti e guasti improvvisi 24/7.",
        fullDescription: "Quando l'acqua invade la tua casa o uno scarico si blocca improvvisamente, ogni minuto conta. Il nostro servizio di Pronto Intervento Idraulico a Milano è attivo 24 ore su 24, 7 giorni su 7, per garantirti assistenza immediata in tutta la città e nell'hinterland.",
        features: [
          "Arrivo entro 60-90 minuti dalla chiamata",
          "Riparazione perdite occulte e visibili",
          "Gestione allagamenti e prosciugamenti",
          "Interventi d'urgenza su colonne condominiali",
          "Tariffe trasparenti comunicate prima dell'intervento"
        ],
        iconName: "Clock",
        order: 1,
      },
      {
        slug: "scarichi-disotturazioni",
        title: "Scarichi e Disotturazioni",
        description: "Lavandini, WC e colonne condominiali intasate. Interventi efficaci e puliti.",
        fullDescription: "Uno scarico intasato non è solo un disagio, ma può causare danni strutturali e problemi igienici. Utilizziamo tecniche moderne di disotturazione per liberare tubazioni di ogni diametro, garantendo il ripristino totale del flusso senza danneggiare i tuoi impianti.",
        features: [
          "Disotturazione lavandini, bidet e docce",
          "Sblocco WC con attrezzatura professionale",
          "Pulizia colonne di scarico condominiali",
          "Videoispezioni per individuare blocchi persistenti",
          "Rimozione calcare e residui organici"
        ],
        iconName: "Droplets",
        order: 2,
      },
      {
        slug: "riscaldamento",
        title: "Riscaldamento",
        description: "Manutenzione e installazione termosifoni e valvole termostatiche.",
        fullDescription: "Un impianto di riscaldamento efficiente significa comfort e risparmio in bolletta. Ci occupiamo della manutenzione dei tuoi termosifoni, dell'installazione di valvole termostatiche a norma e del bilanciamento dell'impianto per assicurare una diffusione uniforme del calore.",
        features: [
          "Installazione e sostituzione termosifoni",
          "Montaggio valvole termostatiche obbligatorie",
          "Lavaggio chimico dell'impianto di riscaldamento",
          "Sfiato e bilanciamento termico",
          "Riparazione perdite su tubazioni riscaldamento"
        ],
        iconName: "Thermometer",
        order: 3,
      },
      {
        slug: "rifacimento-bagni",
        title: "Rifacimento Bagni",
        description: "Sostituzione sanitari, box doccia e ristrutturazioni complete chiavi in mano.",
        fullDescription: "Trasformiamo il tuo vecchio bagno in un'oasi di benessere. Dalla semplice sostituzione della vasca con una doccia moderna alla ristrutturazione completa degli impianti e dei rivestimenti, offriamo un servizio artigianale di alta qualità con tempi certi.",
        features: [
          "Rifacimento completo impianti idraulici",
          "Sostituzione sanitari e rubinetteria",
          "Trasformazione da vasca a doccia",
          "Posa pavimenti e rivestimenti",
          "Installazione box doccia e piatti doccia a filo pavimento"
        ],
        iconName: "Bath",
        order: 4,
      },
      {
        slug: "scaldabagni-boiler",
        title: "Scaldabagni e Boiler",
        description: "Installazione, riparazione e sostituzione di boiler elettrici e a gas.",
        fullDescription: "L'acqua calda è un servizio essenziale. Siamo esperti nell'installazione e manutenzione di scaldabagni elettrici e boiler a gas delle migliori marche. Ti consigliamo la soluzione più efficiente in base ai tuoi consumi e allo spazio disponibile.",
        features: [
          "Installazione scaldabagni elettrici e a gas",
          "Manutenzione e sostituzione anodo di magnesio",
          "Riparazione guasti e perdite boiler",
          "Smaltimento del vecchio apparecchio incluso",
          "Check-up sicurezza e collaudo post-installazione"
        ],
        iconName: "Wrench",
        order: 5,
      },
      {
        slug: "impiantistica-civile",
        title: "Impiantistica Civile",
        description: "Nuovi impianti idraulici a norma e rifacimento tubazioni esistenti.",
        fullDescription: "Progettiamo e realizziamo impianti idraulici per abitazioni civili seguendo le normative vigenti. Che si tratti di una nuova costruzione o di un rinnovo totale durante una ristrutturazione, garantiamo tubazioni resistenti e installazioni a regola d'arte.",
        features: [
          "Progettazione impianti idraulici a norma",
          "Sostituzione vecchie tubazioni in piombo o ferro",
          "Impianti di adduzione acqua e scarico",
          "Installazione contatori e riduttori di pressione",
          "Certificazione di conformità degli impianti"
        ],
        iconName: "Home",
        order: 6,
      },
    ];

    for (const service of services) {
      await ctx.db.insert("services", service);
    }
    return null;
  },
});

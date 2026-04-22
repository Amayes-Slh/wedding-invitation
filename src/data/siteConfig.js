const kabylePhrase = "Ansuf yisswen";

const siteConfig = {
  wedding: {
    coupleNames: "Amayes & Manel",
    title: "Notre mariage",
    kabylePhrase,
    dateLabel: "Le Samedi 20 juin 2026",
    dateISO: "2026-06-20T16:00:00+02:00",
    venue: "Mairie d'Aulnay sous Bois - Bd de l'Hôtel de ville.",
    introMessage: "Tu es invité(e) à célébrer avec nous ce moment uniquexz."
  },
  intro: {
    enabled: true,
    introMode: "envelope",

    sealMonogram: "A & M",
    exclusiveLine: "Cette invitation est exclusive pour toi",
    
    sealInitial: "A",
    useVideoBackground: false,
    videoSrc: "/assets/intro-envelope-HFQPjaLP.mp4",
    posterSrc: "/assets/intro-envelope-poster-Bi8UMZ1A.jpg",
    ctaLabel: "Ouvrir l'invitation",
    introFooterHint: "Cliquez sur le cachet pour ouvrir",
    overlayTitle: "Amayes & Manel",
    overlaySubtitle: "Le Samedi 20 juin 2026",
    overlayMessage: "Nous avons la joie de vous inviter à notre mariage."
  },
  hero: {
    kabylePhrase,
    videoSrc: "/assets/hero-video-new-G6oopIOA.mp4",
    musicSrc: "/assets/wedding-march-CDiiiBMO.mp3",
    quote:
      "Deux coeurs, une promesse, et une journée inoubliable à partager avec nos proches pour embellir notre Dolce Hayat ❤️."
  },
  schedule: [
    { time: "11:15", title: "Arrivée des invités", description: "Acceuil & Bienvenue." },
    { time: "11:30", title: "Cérémonie", description: "Echange des voeux." },
    { time: "12:15", title: "Shooting photos", description: "Préparez vos plus belles poses." },
    { time: "13:00", title: "Déjeuner entre famille", description: "Repas en famille." },
    { time: "19:00", title: "Soirée entre amis", description: "Cocktails & moments entre amis." }
  ],
  rsvp: {
    title: "Confirme ta presence",
    subtitle: "Merci de nous répondre avant le 1er juin 2026."
  },
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  }
};

export default siteConfig;

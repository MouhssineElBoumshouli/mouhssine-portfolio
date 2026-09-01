import type { Locale } from "./config"

export type BioLine = { text: string; strong?: string[] }

export type LocaleMessages = {
  localeName: string
  htmlLang: string
  nav: {
    main: string
    home: string
    projects: string
    contact: string
  }
  language: {
    label: string
    switchTo: (locale: string) => string
  }
  accessibility: {
    skipToContent: string
    openMenu: string
    closeMenu: string
    closeDialog: string
    muteSound: string
    unmuteSound: string
    mute: string
    unmute: string
    localTime: string
    interactiveDots: string
    contributionGraph: string
    toggleTheme: string
    openCommandMenu: string
    showGithubPhoto: string
    areasOfFocus: string
  }
  hero: {
    roles: readonly string[]
    bookCall: string
    sendEmail: string
  }
  home: {
    about: string
    connect: string
    experience: string
    activity: string
    projects: string
    skills: string
    milestones: string
    bio: readonly BioLine[]
    seeAllProjects: string
    stillReading: string
    startConversation: string
    you: string
    loadingContributions: string
    contribution: (count: number) => string
    contributionsOn: (label: string) => string
    totalContributions: (range: string) => string
    present: string
    venn: {
      top: string
      left: string
      right: string
      bottom: string
    }
  }
  connect: {
    links: {
      resume: string
      contact: string
      github: string
      linkedin: string
      frenchResume: string
      email: string
    }
  }
  projectsPage: {
    eyebrow: string
    title: string
    description: string
    searchPlaceholder: string
    searchLabel: string
    clearSearch: string
    empty: string
  }
  projectDialog: {
    viewDetails: (title: string) => string
    live: string
    code: string
    previewAlt: (title: string) => string
    status: {
      live: string
      building: string
      research: string
    }
    whyBuilt: string
    whatBuilt: string
    capabilities: string
    technicalDetails: string
    contribution: string
    outcome: string
    technologies: string
    liveDemo: string
    viewCode: string
  }
  contactPage: {
    eyebrow: string
    title: string
    basedIn: string
    fastestRoutes: string
    scheduleCall: string
    calendlyDetail: string
    linkedIn: string
    linkedInDetail: string
    sendMessage: string
    intro: string
  }
  contactForm: {
    emailLabel: string
    emailPlaceholder: string
    messageLabel: string
    messagePlaceholder: string
    minimumMessage: (count: number) => string
    sending: string
    sendMessage: string
    sent: string
    connectionError: string
    genericError: string
    goesStraightTo: string
  }
  notFound: {
    title: string
    description: string
    backHome: string
  }
  pageHeader: {
    home: string
  }
  command: {
    title: string
    description: string
    inputPlaceholder: string
    empty: string
    pages: string
    projects: string
    links: string
    settings: string
    github: string
    linkedin: string
    schedule: string
    resume: string
    email: string
    switchToTheme: (theme: string) => string
    light: string
    dark: string
    turnOffSound: string
    turnOnSound: string
    search: string
    themeTooltip: string
  }
  footer: {
    text: string
    note: string
  }
  metadata: {
    description: string
    projectsDescription: string
    contactDescription: string
    previewTitle: string
  }
}

const english: LocaleMessages = {
  localeName: "English",
  htmlLang: "en",
  nav: {
    main: "Main",
    home: "Home",
    projects: "Projects",
    contact: "Contact",
  },
  language: {
    label: "Language",
    switchTo: (locale) => `Switch to ${locale}`,
  },
  accessibility: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    closeDialog: "Close dialog",
    muteSound: "Mute interface sound",
    unmuteSound: "Unmute interface sound",
    mute: "Mute",
    unmute: "Unmute",
    localTime: "My local time",
    interactiveDots: "Interactive dot field",
    contributionGraph: "Contribution graph",
    toggleTheme: "Toggle theme",
    openCommandMenu: "Open command menu",
    showGithubPhoto: "Show GitHub profile photo",
    areasOfFocus: "Areas of focus",
  },
  hero: {
    roles: [
      "AI Engineering Student",
      "Full-Stack & AI Developer",
      "Applied AI & Computer Vision",
    ],
    bookCall: "Book a call",
    sendEmail: "Send an email",
  },
  home: {
    about: "About",
    connect: "Connect",
    experience: "Experience",
    activity: "Activity",
    projects: "Projects",
    skills: "Skills",
    milestones: "Milestones",
    bio: [
      {
        text: "I’m Mouhssine, an AI engineering student at EIDIA - Université Euromed de Fès, working across full-stack software, LLM agents and computer vision.",
      },
      {
        text: "I build end-to-end systems with Python, FastAPI, React, TypeScript, PostgreSQL and Docker - from data and API design through to usable interfaces.",
        strong: ["Python, FastAPI, React, TypeScript, PostgreSQL and Docker"],
      },
      {
        text: "Recent work includes a reproducible DARE-Bench agent reliability study, SmartImport procurement decision support, and medical-image skeletonisation research.",
        strong: [
          "DARE-Bench agent reliability study",
          "SmartImport procurement decision support",
          "medical-image skeletonisation research",
        ],
      },
    ],
    seeAllProjects: "See all projects",
    stillReading: "Still reading? That means something clicked. Let’s talk.",
    startConversation: "Start a conversation",
    you: "You",
    loadingContributions: "Loading contributions",
    contribution: (count) => (count === 1 ? "1 contribution" : `${count} contributions`),
    contributionsOn: (label) => `on ${label}`,
    totalContributions: (range) => `{{count}} contributions in ${range}`,
    present: "Present",
    venn: {
      top: "AI Engineering",
      left: "Systems Thinking",
      right: "Applied Research",
      bottom: "Product Delivery\n& User Empathy",
    },
  },
  connect: {
    links: {
      resume: "Resume",
      contact: "Contact",
      github: "GitHub",
      linkedin: "LinkedIn",
      frenchResume: "CV (FR)",
      email: "Email",
    },
  },
  projectsPage: {
    eyebrow: "Projects",
    title: "Everything I’ve shipped",
    description:
      "Selected AI and full-stack projects built by Mouhssine El Boumshouli - from reproducible research and computer vision to deployed web systems.",
    searchPlaceholder: "Search projects…",
    searchLabel: "Search projects",
    clearSearch: "Clear search",
    empty: "No projects match that search.",
  },
  projectDialog: {
    viewDetails: (title) => `View details for ${title}`,
    live: "Live",
    code: "Code",
    previewAlt: (title) => `${title} project preview`,
    status: { live: "Live", building: "In progress", research: "Research" },
    whyBuilt: "Why I built it",
    whatBuilt: "What I built",
    capabilities: "Key capabilities",
    technicalDetails: "Technical details",
    contribution: "My contribution",
    outcome: "Outcome / current status",
    technologies: "Technologies",
    liveDemo: "Live Demo",
    viewCode: "View Code",
  },
  contactPage: {
    eyebrow: "Contact",
    title: "Let’s talk about what you’re building",
    basedIn: "Based in Fès",
    fastestRoutes: "Fastest routes",
    scheduleCall: "Schedule a 30-minute call",
    calendlyDetail: "Calendly - pick any open slot",
    linkedIn: "Connect on LinkedIn",
    linkedInDetail: "mouhssine-bms",
    sendMessage: "Send a message",
    intro:
      "Write here and it lands in my inbox. Roles, collaboration, research, or a question about something I’ve built - all welcome.",
  },
  contactForm: {
    emailLabel: "Your email",
    emailPlaceholder: "you@example.com",
    messageLabel: "Your message",
    messagePlaceholder: "What are you building, and where do you want help?",
    minimumMessage: (count) => `At least ${count} characters so I know what you need.`,
    sending: "Sending",
    sendMessage: "Send message",
    sent: "Message sent. I’ll get back to you soon.",
    connectionError: "No connection. Check your network and try again.",
    genericError: "That didn’t send. Try again in a moment.",
    goesStraightTo: "Goes straight to",
  },
  pageHeader: { home: "Home" },
  notFound: {
    title: "This page doesn’t exist",
    description: "The link may be out of date. Everything lives on the home page - start there, or search with ⌘K.",
    backHome: "Back home",
  },
  command: {
    title: "Command menu",
    description: "Jump to a page, open a link, or change a setting.",
    inputPlaceholder: "Jump to a page or link…",
    empty: "Nothing matches that.",
    pages: "Pages",
    projects: "Projects",
    links: "Links",
    settings: "Settings",
    github: "GitHub",
    linkedin: "LinkedIn",
    schedule: "Schedule a call",
    resume: "Resume",
    email: "Email",
    switchToTheme: (theme) => `Switch to ${theme} theme`,
    light: "light",
    dark: "dark",
    turnOffSound: "Turn off interface sound",
    turnOnSound: "Turn on interface sound",
    search: "Search",
    themeTooltip: "Toggle theme (D)",
  },
  footer: { text: "Designed and developed by", note: "Built in the open." },
  metadata: {
    description:
      "Portfolio of Mouhssine El Boumshouli, an AI engineering student building full-stack software, LLM agent evaluations, procurement systems and computer-vision research tools.",
    projectsDescription:
      "Selected AI and full-stack projects built by Mouhssine El Boumshouli - from reproducible research and computer vision to deployed web systems.",
    contactDescription:
      "Get in touch with Mouhssine El Boumshouli about AI engineering, full-stack software, research, or anything he has built.",
    previewTitle:
      "Mouhssine El Boumshouli - AI engineering, full-stack systems, and applied AI.",
  },
}

const french: LocaleMessages = {
  localeName: "Français",
  htmlLang: "fr",
  nav: {
    main: "Principal",
    home: "Accueil",
    projects: "Projets",
    contact: "Contact",
  },
  language: {
    label: "Langue",
    switchTo: (locale) => `Passer en ${locale}`,
  },
  accessibility: {
    skipToContent: "Aller au contenu",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    closeDialog: "Fermer la boîte de dialogue",
    muteSound: "Désactiver les sons de l’interface",
    unmuteSound: "Activer les sons de l’interface",
    mute: "Désactiver le son",
    unmute: "Activer le son",
    localTime: "Mon heure locale",
    interactiveDots: "Champ de points interactif",
    contributionGraph: "Graphique des contributions",
    toggleTheme: "Changer de thème",
    openCommandMenu: "Ouvrir le menu de commandes",
    showGithubPhoto: "Afficher la photo de profil GitHub",
    areasOfFocus: "Domaines d’activité",
  },
  hero: {
    roles: [
      "Étudiant en ingénierie de l’IA",
      "Développeur full-stack et IA",
      "IA appliquée et vision par ordinateur",
    ],
    bookCall: "Planifier un appel",
    sendEmail: "Envoyer un e-mail",
  },
  home: {
    about: "À propos",
    connect: "Me contacter",
    experience: "Expérience",
    activity: "Activité",
    projects: "Projets",
    skills: "Compétences",
    milestones: "Étapes clés",
    bio: [
      {
        text: "Je suis Mouhssine, étudiant en ingénierie de l’IA à l’EIDIA - Université Euromed de Fès. Je travaille sur des logiciels full-stack, des agents LLM et la vision par ordinateur.",
      },
      {
        text: "Je construis des systèmes de bout en bout avec Python, FastAPI, React, TypeScript, PostgreSQL et Docker, de la conception des données et des API jusqu’aux interfaces utilisables.",
        strong: ["Python, FastAPI, React, TypeScript, PostgreSQL et Docker"],
      },
      {
        text: "Mes travaux récents comprennent une étude reproductible de la fiabilité des agents DARE-Bench, l’outil d’aide à la décision d’achat SmartImport et des recherches sur la squelettisation d’images médicales.",
        strong: [
          "étude reproductible de la fiabilité des agents DARE-Bench",
          "outil d’aide à la décision d’achat SmartImport",
          "recherches sur la squelettisation d’images médicales",
        ],
      },
    ],
    seeAllProjects: "Voir tous les projets",
    stillReading: "Vous êtes toujours là ? C’est que quelque chose vous a parlé. Parlons-en.",
    startConversation: "Entamer une conversation",
    you: "Vous",
    loadingContributions: "Chargement des contributions",
    contribution: (count) => (count === 1 ? "1 contribution" : `${count} contributions`),
    contributionsOn: (label) => `le ${label}`,
    totalContributions: (range) => `{{count}} contributions sur ${range}`,
    present: "Présent",
    venn: {
      top: "Ingénierie de l’IA",
      left: "Pensée systémique",
      right: "Recherche appliquée",
      bottom: "Livraison produit\n& écoute utilisateur",
    },
  },
  connect: {
    links: {
      resume: "CV",
      contact: "Contact",
      github: "GitHub",
      linkedin: "LinkedIn",
      frenchResume: "CV (FR)",
      email: "E-mail",
    },
  },
  projectsPage: {
    eyebrow: "Projets",
    title: "Tout ce que j’ai livré",
    description:
      "Une sélection de projets d’IA et full-stack réalisés par Mouhssine El Boumshouli : recherche reproductible, vision par ordinateur et systèmes web déployés.",
    searchPlaceholder: "Rechercher un projet…",
    searchLabel: "Rechercher un projet",
    clearSearch: "Effacer la recherche",
    empty: "Aucun projet ne correspond à cette recherche.",
  },
  projectDialog: {
    viewDetails: (title) => `Voir les détails de ${title}`,
    live: "En ligne",
    code: "Code",
    previewAlt: (title) => `Aperçu du projet ${title}`,
    status: { live: "En ligne", building: "En cours", research: "Recherche" },
    whyBuilt: "Pourquoi je l’ai construit",
    whatBuilt: "Ce que j’ai construit",
    capabilities: "Fonctionnalités clés",
    technicalDetails: "Détails techniques",
    contribution: "Ma contribution",
    outcome: "Résultat / état actuel",
    technologies: "Technologies",
    liveDemo: "Démo en ligne",
    viewCode: "Voir le code",
  },
  contactPage: {
    eyebrow: "Contact",
    title: "Parlons de ce que vous construisez",
    basedIn: "Basé à Fès",
    fastestRoutes: "Les moyens les plus rapides",
    scheduleCall: "Planifier un appel de 30 minutes",
    calendlyDetail: "Calendly - choisissez un créneau disponible",
    linkedIn: "Me retrouver sur LinkedIn",
    linkedInDetail: "mouhssine-bms",
    sendMessage: "Envoyer un message",
    intro:
      "Écrivez ici et votre message arrivera dans ma boîte de réception. Opportunité, collaboration, recherche ou question sur un projet : tout est bienvenu.",
  },
  contactForm: {
    emailLabel: "Votre e-mail",
    emailPlaceholder: "vous@exemple.com",
    messageLabel: "Votre message",
    messagePlaceholder: "Que construisez-vous et sur quoi souhaitez-vous échanger ?",
    minimumMessage: (count) => `Au moins ${count} caractères pour comprendre votre demande.`,
    sending: "Envoi",
    sendMessage: "Envoyer le message",
    sent: "Message envoyé. Je vous répondrai bientôt.",
    connectionError: "Aucune connexion. Vérifiez votre réseau puis réessayez.",
    genericError: "L’envoi a échoué. Réessayez dans un instant.",
    goesStraightTo: "Arrive directement chez",
  },
  pageHeader: { home: "Accueil" },
  notFound: {
    title: "Cette page n’existe pas",
    description: "Le lien est peut-être obsolète. Tout se trouve sur la page d’accueil : commencez ici ou recherchez avec ⌘K.",
    backHome: "Retour à l’accueil",
  },
  command: {
    title: "Menu de commandes",
    description: "Accédez à une page, ouvrez un lien ou modifiez un réglage.",
    inputPlaceholder: "Accéder à une page ou un lien…",
    empty: "Aucun résultat.",
    pages: "Pages",
    projects: "Projets",
    links: "Liens",
    settings: "Réglages",
    github: "GitHub",
    linkedin: "LinkedIn",
    schedule: "Planifier un appel",
    resume: "CV",
    email: "E-mail",
    switchToTheme: (theme) => `Passer au thème ${theme}`,
    light: "clair",
    dark: "sombre",
    turnOffSound: "Désactiver les sons de l’interface",
    turnOnSound: "Activer les sons de l’interface",
    search: "Rechercher",
    themeTooltip: "Changer de thème (D)",
  },
  footer: { text: "Conçu et développé par", note: "Construit au grand jour." },
  metadata: {
    description:
      "Portfolio de Mouhssine El Boumshouli, étudiant en ingénierie de l’IA qui construit des logiciels full-stack, des évaluations d’agents LLM, des systèmes d’achat et des outils de recherche en vision par ordinateur.",
    projectsDescription:
      "Une sélection de projets d’IA et full-stack réalisés par Mouhssine El Boumshouli : recherche reproductible, vision par ordinateur et systèmes web déployés.",
    contactDescription:
      "Contactez Mouhssine El Boumshouli au sujet de l’ingénierie de l’IA, du développement full-stack, de la recherche ou de ses projets.",
    previewTitle:
      "Mouhssine El Boumshouli - ingénierie de l’IA, systèmes full-stack et IA appliquée.",
  },
}

export const messages: Record<Locale, LocaleMessages> = { en: english, fr: french }

export function getMessages(locale: Locale): LocaleMessages {
  return messages[locale]
}

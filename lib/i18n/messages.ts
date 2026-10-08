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
      internship: string
      prototype: string
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
  errorBoundary: {
    title: string
    description: string
    retry: string
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
    frenchResume: string
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
      "Building web and mobile software",
      "Studying AI agent reliability",
    ],
    bookCall: "Schedule a call",
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
        text: "I’m Mouhssine, an AI engineering student at EIDIA, Université Euromed de Fès. I’m based in Morocco and expect to graduate in 2028.",
      },
      {
        text: "I like taking a practical problem, building something around it, and testing the parts I’m not sure about. Sometimes that means a web or mobile app; sometimes it means an experiment to understand an AI system.",
      },
      {
        text: "I’m looking for a summer 2027 internship in AI engineering, software engineering, or research.",
        strong: ["summer 2027 internship"],
      },
    ],
    seeAllProjects: "See all projects",
    stillReading: "Have an internship opportunity, a research project, or a question about my work? Get in touch.",
    startConversation: "Send a message",
    you: "You",
    loadingContributions: "Loading contributions",
    contribution: (count) => (count === 1 ? "1 contribution" : `${count} contributions`),
    contributionsOn: (label) => `on ${label}`,
    totalContributions: (range) => `{{count}} contributions in ${range}`,
    present: "Present",
    venn: {
      top: "AI applications",
      left: "Web & mobile",
      right: "Evaluation",
      bottom: "Computer\nvision",
    },
  },
  connect: {
    links: {
      resume: "Resume (EN)",
      contact: "Contact",
      github: "GitHub",
      linkedin: "LinkedIn",
      frenchResume: "CV (FR)",
      email: "Email",
    },
  },
  projectsPage: {
    eyebrow: "Projects",
    title: "Selected projects",
    description:
      "Research studies, an internship project, and web and mobile software. Open a project to see what I built, how it works, and its limitations.",
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
    status: { live: "Live demo", building: "In progress", research: "Research", internship: "Internship project", prototype: "Prototype" },
    whyBuilt: "The problem",
    whatBuilt: "What I built",
    capabilities: "Key capabilities",
    technicalDetails: "Technical details",
    contribution: "My contribution",
    outcome: "Results and limitations",
    technologies: "Technologies",
    liveDemo: "Live Demo",
    viewCode: "View Code",
  },
  contactPage: {
    eyebrow: "Contact",
    title: "Let’s talk",
    basedIn: "Based in Fès",
    fastestRoutes: "Fastest routes",
    scheduleCall: "Schedule a 30-minute call",
    calendlyDetail: "Calendly - pick any open slot",
    linkedIn: "Connect on LinkedIn",
    linkedInDetail: "mouhssine-bms",
    sendMessage: "Send a message",
    intro:
      "I’m looking for a summer 2027 internship. If you have an opportunity in AI engineering, software engineering, or research—or a question about one of my projects—send me a message.",
  },
  contactForm: {
    emailLabel: "Your email",
    emailPlaceholder: "you@example.com",
    messageLabel: "Your message",
    messagePlaceholder: "Tell me about the opportunity or what you’d like to discuss.",
    minimumMessage: (count) => `At least ${count} characters so I can understand your message.`,
    sending: "Sending",
    sendMessage: "Send message",
    sent: "Message sent. I’ll get back to you soon.",
    connectionError: "No connection. Check your network and try again.",
    genericError: "That didn’t send. Try again in a moment.",
    goesStraightTo: "Sent directly to",
  },
  pageHeader: { home: "Home" },
  errorBoundary: { title: "Something went wrong", description: "Try again or reload the page.", retry: "Try again" },
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
    resume: "Resume (EN)",
    frenchResume: "CV (FR)",
    email: "Email",
    switchToTheme: (theme) => `Switch to ${theme} theme`,
    light: "light",
    dark: "dark",
    turnOffSound: "Turn off interface sound",
    turnOnSound: "Turn on interface sound",
    search: "Search",
    themeTooltip: "Toggle theme (D)",
  },
  footer: { text: "Developed by", note: "Source on GitHub." },
  metadata: {
    description:
      "Mouhssine El Boumshouli, AI engineering student at EIDIA. Projects in AI evaluation, software and computer vision. Seeking a summer 2027 internship.",
    projectsDescription:
      "Explore Mouhssine El Boumshouli’s AI research, internship work, and web and mobile projects, including DARE-Bench, SmartImport, Recall, and medskel.",
    contactDescription:
      "Contact Mouhssine El Boumshouli about summer 2027 internships in AI engineering, software engineering, or research, and questions about his projects.",
    previewTitle:
      "Mouhssine El Boumshouli — AI Engineering Student",
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
      "Développement web et mobile",
      "Étude de la fiabilité des agents IA",
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
        text: "Je suis Mouhssine, étudiant en ingénierie de l’IA à l’EIDIA, Université Euromed de Fès. Je suis basé au Maroc et prévois d’obtenir mon diplôme en 2028.",
      },
      {
        text: "J’aime partir d’un problème concret, développer une solution et tester les points qui me posent question. Cela peut prendre la forme d’une application web ou mobile, ou d’une expérience pour comprendre le comportement d’un système d’IA.",
      },
      {
        text: "Je recherche un stage pour l’été 2027 en ingénierie de l’IA, en développement logiciel ou en recherche.",
        strong: ["stage pour l’été 2027"],
      },
    ],
    seeAllProjects: "Voir tous les projets",
    stillReading: "Vous avez une opportunité de stage, un projet de recherche ou une question sur mon travail ? Contactez-moi.",
    startConversation: "Envoyer un message",
    you: "Vous",
    loadingContributions: "Chargement des contributions",
    contribution: (count) => (count === 1 ? "1 contribution" : `${count} contributions`),
    contributionsOn: (label) => `le ${label}`,
    totalContributions: (range) => `{{count}} contributions sur ${range}`,
    present: "aujourd’hui",
    venn: {
      top: "Applications d’IA",
      left: "Web et mobile",
      right: "Évaluation",
      bottom: "Vision par\nordinateur",
    },
  },
  connect: {
    links: {
      resume: "CV (EN)",
      contact: "Contact",
      github: "GitHub",
      linkedin: "LinkedIn",
      frenchResume: "CV (FR)",
      email: "E-mail",
    },
  },
  projectsPage: {
    eyebrow: "Projets",
    title: "Projets sélectionnés",
    description:
      "Des études de recherche, un projet de stage et des applications web et mobiles. Ouvrez un projet pour découvrir ce que j’ai réalisé, son fonctionnement et ses limites.",
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
    status: { live: "Démo en ligne", building: "En cours", research: "Recherche", internship: "Projet de stage", prototype: "Prototype" },
    whyBuilt: "Le problème",
    whatBuilt: "Ce que j’ai réalisé",
    capabilities: "Fonctionnalités clés",
    technicalDetails: "Détails techniques",
    contribution: "Ma contribution",
    outcome: "Résultats et limites",
    technologies: "Technologies",
    liveDemo: "Démo en ligne",
    viewCode: "Voir le code",
  },
  contactPage: {
    eyebrow: "Contact",
    title: "Échangeons",
    basedIn: "Basé à Fès",
    fastestRoutes: "Les moyens les plus rapides",
    scheduleCall: "Planifier un appel de 30 minutes",
    calendlyDetail: "Calendly - choisissez un créneau disponible",
    linkedIn: "Me retrouver sur LinkedIn",
    linkedInDetail: "mouhssine-bms",
    sendMessage: "Envoyer un message",
    intro:
      "Je recherche un stage pour l’été 2027. Si vous avez une opportunité en ingénierie de l’IA, en développement logiciel ou en recherche, ou une question sur l’un de mes projets, envoyez-moi un message.",
  },
  contactForm: {
    emailLabel: "Votre e-mail",
    emailPlaceholder: "vous@exemple.com",
    messageLabel: "Votre message",
    messagePlaceholder: "Présentez l’opportunité ou le sujet dont vous souhaitez discuter.",
    minimumMessage: (count) => `Au moins ${count} caractères pour comprendre votre demande.`,
    sending: "Envoi",
    sendMessage: "Envoyer le message",
    sent: "Message envoyé. Je vous répondrai bientôt.",
    connectionError: "Aucune connexion. Vérifiez votre réseau puis réessayez.",
    genericError: "L’envoi a échoué. Réessayez dans un instant.",
    goesStraightTo: "Envoyé directement à",
  },
  pageHeader: { home: "Accueil" },
  errorBoundary: { title: "Une erreur est survenue", description: "Réessayez ou rechargez la page.", retry: "Réessayer" },
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
    resume: "CV (EN)",
    frenchResume: "CV (FR)",
    email: "E-mail",
    switchToTheme: (theme) => `Passer au thème ${theme}`,
    light: "clair",
    dark: "sombre",
    turnOffSound: "Désactiver les sons de l’interface",
    turnOnSound: "Activer les sons de l’interface",
    search: "Rechercher",
    themeTooltip: "Changer de thème (D)",
  },
  footer: { text: "Développé par", note: "Code source sur GitHub." },
  metadata: {
    description:
      "Mouhssine El Boumshouli, étudiant en IA à l’EIDIA. Projets logiciels et de recherche. À la recherche d’un stage pour l’été 2027.",
    projectsDescription:
      "Découvrez les projets de recherche, de stage, web et mobiles de Mouhssine El Boumshouli : DARE-Bench, SmartImport, Recall et medskel.",
    contactDescription:
      "Contactez Mouhssine El Boumshouli pour un stage à l’été 2027 en IA, en développement logiciel ou en recherche, ou pour échanger sur ses projets.",
    previewTitle:
      "Mouhssine El Boumshouli — Étudiant en ingénierie de l’IA",
  },
}

export const messages: Record<Locale, LocaleMessages> = { en: english, fr: french }

export function getMessages(locale: Locale): LocaleMessages {
  return messages[locale]
}

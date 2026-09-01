import { experiences, type Experience } from "@/lib/content/experience"
import { milestones, type Milestone } from "@/lib/content/milestones"
import { projects, type Project } from "@/lib/content/projects"
import { profile, type SocialLink } from "@/lib/content/profile"
import { getMessages } from "./messages"
import type { Locale } from "./config"

type ExperienceCopy = Pick<Experience, "role" | "location">
type MilestoneCopy = Pick<Milestone, "title" | "description">
type ProjectDetailsCopy = Partial<Project["details"]>

type ProjectCopy = {
  title: string
  subheading?: string
  description: string
  details?: ProjectDetailsCopy
}

const frenchExperience: Record<string, ExperienceCopy> = {
  convoroute: {
    role: "Fondateur et développeur",
    location: "États-Unis · À distance",
  },
  "bounaim-auto": {
    role: "Stagiaire en ingénierie logicielle et IA",
    location: "Béni Mellal, Maroc",
  },
}

const frenchMilestones: MilestoneCopy[] = [
  {
    title: "Début d’un cursus en ingénierie de l’IA",
    description:
      "J’ai rejoint l’EIDIA à l’Université Euromed de Fès après le cycle préparatoire.",
  },
  {
    title: "Création de Convoroute LLC",
    description:
      "Début du développement d’un SaaS B2B de chatbots de service client avec IA embarquée.",
  },
  {
    title: "Début du développement de SmartImport",
    description:
      "Début du développement d’une plateforme auditable d’aide à la décision d’achat pendant un stage en ingénierie logicielle et IA.",
  },
  {
    title: "Réalisation d’une étude de fiabilité DARE-Bench",
    description:
      "Réalisation d’une étude reproductible en 240 exécutions sur les capacités et la répétabilité d’agents LLM.",
  },
]

const frenchProjects: Record<string, ProjectCopy> = {
  "dare-agent-reliability": {
    title: "Étude de fiabilité des agents DARE-Bench",
    subheading: "Agents LLM, évaluation et reproductibilité",
    description:
      "Une étude reproductible de 240 exécutions comparant des budgets de tours d’agent sur un sous-ensemble fixe de DARE-Bench, avec rescoring officiel et analyse des échecs.",
    details: {
      motivation:
        "Examiner si les scores moyens masquent les variations entre exécutions lorsqu’une même tâche d’instruction est répétée.",
      built: [
        "Un sous-ensemble figé de 24 tâches Classification-IF et Regression-IF, répété cinq fois avec des budgets de trois et cinq tours.",
        "Capture des exécutions, rescoring exact officiel, contrôles d’intégrité, étiquettes d’échec, tableaux dérivés et figures destinées à la publication.",
      ],
      capabilities: [
        "Configuration reproductible des expériences et conservation de la provenance",
        "Analyse de la fiabilité au niveau des tâches et des désaccords par paire",
        "Figures prêtes à publier et limites documentées",
      ],
      technicalDetails: [
        "L’étude enregistre 240 identités immuables de tâches et de conditions.",
        "L’exécution utilise un évaluateur DARE-Bench versionné et un bac à sable Docker ; les tableaux et empreintes commités forment la couche d’audit publique.",
      ],
      role: "Implémentation de l’étude indépendante, exécution des expériences et analyse.",
      outcome:
        "Sur ce sous-ensemble fixe, cinq tours ont fait passer le succès moyen en exact-match de 34,2 % à 50,0 %, tandis que le désaccord moyen par paire est passé de 15,0 % à 21,7 %. Il s’agit de résultats descriptifs propres à cette étude, et non d’une affirmation générale de performance.",
    },
  },
  smartimport: {
    title: "SmartImport",
    subheading: "Aide à la décision d’achat",
    description:
      "Une plateforme full-stack qui compare les devis de fournisseurs automobiles internationaux, les coûts rendus et la complétude des achats avec une assistance IA soumise à revue humaine.",
    details: {
      motivation:
        "Comparer équitablement les totaux fournisseurs lorsque les devis contiennent des produits, quantités, devises et coûts additionnels différents.",
      built: [
        "Gestion des besoins et comparaison des fournisseurs tenant compte de la complétude.",
        "Import de devis PDF/XLSX avec prévisualisation par étapes avant création des enregistrements.",
        "Normalisation multi-devises, calcul du coût rendu, estimation des sorties de trésorerie et instantanés d’analyses enregistrés.",
        "Extraction et rapprochement assistés par IA avec revue humaine, et exports d’analyses PDF/XLSX.",
      ],
      capabilities: [
        "Conserve les offres incomplètes visibles tout en limitant les constats aux offres prêtes pour le calcul",
        "Sépare les biens chiffrés, les coûts additionnels et les hypothèses de taux de change",
        "Garde les calculs déterministes du backend comme référence lorsque l’assistance IA est activée",
      ],
      technicalDetails: [
        "Le frontend React/TypeScript communique avec un service FastAPI via Nginx.",
        "PostgreSQL, SQLAlchemy et Alembic assurent la persistance, tandis qu’un fournisseur IA optionnel est isolé derrière une interface backend.",
      ],
      outcome:
        "Le dépôt public contient des artefacts d’évaluation synthétiques et documente leurs limites ; le projet reste marqué comme étant en cours.",
    },
  },
  medskel: {
    title: "medskel",
    subheading: "Squelettisation d’images médicales",
    description:
      "Une implémentation Python et une évaluation de la squelettisation par bissectrices pour des segmentations médicales 2D, comparées à l’amincissement de pixels sur 28 images rétiniennes.",
    details: {
      motivation:
        "Évaluer une méthode de squelettisation par bissectrices privilégiant les polygones face à la référence d’amincissement de pixels pour des segmentations médicales 2D.",
      built: [
        "Simplification de polygones, squelettisation par diagramme de Voronoï/bissectrices et outils de mesure pour des masques 2D.",
        "Construction indépendante par front d’onde pour recouper l’implémentation de Voronoï.",
        "Expériences contrôlées sur fantômes, bruit, transfert et rétines de deux observateurs, avec une suite de tests et des vérifications dérivées à la main.",
      ],
      capabilities: [
        "Comparaison des mesures vasculaires agrégées et du positionnement des lignes centrales entre les méthodes",
        "Évaluation sur des fantômes synthétiques et 28 images rétiniennes tracées par deux observateurs",
        "Documentation des compromis de la méthode et des limites de chaque expérience",
      ],
      technicalDetails: [
        "Les paramètres epsilon, theta_deg et prune contrôlent la simplification de la frontière, le filtrage par angle de séparation et l’élagage adaptatif à l’échelle.",
        "Le dépôt utilise OpenCV, NumPy, SciPy, scikit-image et NetworkX pour ses expériences et son implémentation.",
      ],
      role: "Implémentation, conception des expériences et évaluation.",
      outcome:
        "Le dépôt fait état d’un compromis : des mesures vasculaires agrégées plus reproductibles, mais une position de ligne centrale moins stable que l’amincissement de pixels, avec un temps d’exécution supérieur.",
    },
  },
  "uemf-presence": {
    title: "UEMF Presence",
    subheading: "Présence par GPS et QR tournant",
    description:
      "Un système universitaire de suivi des présences avec plannings récurrents, pointage GPS, jetons QR tournants HMAC-SHA256, circuits de revue et signalement d’anomalies.",
    details: {
      motivation:
        "Accompagner les processus récurrents de présence universitaire grâce à un pointage vérifiable, géolocalisé et à une gestion des anomalies soumise à revue.",
      built: [
        "Gestion des emplois du temps récurrents et des sessions de semestre pour les administrateurs.",
        "Pointage des étudiants et des professeurs par vérification GPS/appareil ou QR tournant.",
        "Circuits de revue pour les professeurs, historique des présences, rapports CSV et tableau de bord administratif des anomalies.",
      ],
      capabilities: [
        "État automatique des sessions dérivé du planning",
        "Contrôles anti-fraude qui signalent les présences suspectes pour revue",
        "Parcours séparés pour les tableaux de bord administrateur, professeur et étudiant",
      ],
      technicalDetails: [
        "Les jetons QR sont protégés par HMAC-SHA256 et changent toutes les 10 secondes.",
        "Le modèle de présence documenté combine des contrôles temporels, géographiques, cryptographiques et liés à l’unicité de l’appareil.",
      ],
      outcome:
        "Réalisé comme projet du module de recherche opérationnelle à l’EIDIA pendant l’année universitaire 2025–2026 et déployé comme démo avec des données de démonstration.",
    },
  },
}

export function getLocalizedProfile(locale: Locale) {
  const messages = getMessages(locale)
  return { roles: messages.hero.roles, bio: messages.home.bio }
}

export function getLocalizedSocialLinks(locale: Locale): SocialLink[] {
  const links = getMessages(locale).connect.links

  return [
    { name: links.resume, href: profile.resumeUrl, isExternal: false, icon: "resume" },
    { name: links.contact, href: locale === "fr" ? "/fr/contact" : "/contact", isExternal: false, icon: "send" },
    { name: links.github, href: profile.githubUrl, isExternal: true, icon: "github" },
    { name: links.linkedin, href: profile.linkedinUrl, isExternal: true, icon: "linkedin" },
    { name: links.frenchResume, href: profile.frenchResumeUrl, isExternal: false, icon: "resume" },
    { name: links.email, href: "mailto:" + profile.email, isExternal: true, icon: "mail" },
  ]
}

export function getLocalizedExperiences(locale: Locale) {
  if (locale === "en") return experiences

  return experiences.map((experience) => ({
    ...experience,
    ...frenchExperience[experience.id],
  }))
}

export function getLocalizedMilestones(locale: Locale) {
  if (locale === "en") return milestones

  return milestones.map((milestone, index) => ({
    ...milestone,
    ...frenchMilestones[index],
  }))
}

export function getLocalizedProject(project: Project, locale: Locale): Project {
  if (locale === "en") return project

  const translation = frenchProjects[project.slug]
  if (!translation) return project

  return {
    ...project,
    ...translation,
    details: { ...project.details, ...translation.details },
  }
}

export function getLocalizedProjects(locale: Locale) {
  return projects.map((project) => getLocalizedProject(project, locale))
}

export function getLocalizedSkillsVenn(locale: Locale) {
  return {
    image: profile.avatarPhoto,
    skills: getMessages(locale).home.venn,
  }
}

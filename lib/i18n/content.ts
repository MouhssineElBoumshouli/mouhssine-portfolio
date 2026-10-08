import { experiences, type Experience } from "@/lib/content/experience"
import { milestones, type Milestone, type MilestoneId } from "@/lib/content/milestones"
import { projects, type Project } from "@/lib/content/projects"
import { profile, type SocialLink } from "@/lib/content/profile"
import { getMessages } from "./messages"
import type { Locale } from "./config"

type ExperienceCopy = Pick<Experience, "role" | "location" | "period">
type MilestoneCopy = Pick<Milestone, "title" | "description" | "date">
type ProjectCopy = Pick<Project, "title" | "subheading" | "summary" | "description" | "imageAlt" | "details">

const frenchExperience: Record<string, ExperienceCopy> = {
  convoroute: { role: "Fondateur et développeur logiciel", location: "États-Unis · À distance", period: { start: "juin 2026" } },
  "bounaim-auto": { role: "Stagiaire en ingénierie logicielle et IA", location: "Béni Mellal, Maroc", period: { start: "juil. 2026", end: "août 2026" } },
}

const frenchMilestones: Record<MilestoneId, MilestoneCopy> = {
  convoroute: { title: "Création de Convoroute LLC", date: "juin 2026", description: "Début du développement de chatbots de service client utilisant l’IA et intégrables à des sites web." },
  smartimport: { title: "Développement de SmartImport pendant mon stage", date: "juil.–août 2026", description: "Développement de la comparaison de devis, des calculs de coûts et de l’extraction documentaire avec vérification humaine chez Bounaim Auto." },
  "dare-agent-reliability": { title: "Réalisation de l’étude DARE-Bench", date: "2026", description: "Réalisation de 240 expériences et publication de l’analyse et des éléments permettant de reproduire les résultats." },
  medskel: { title: "Évaluation de medskel", date: "2026", description: "Comparaison d’une méthode publiée de squelettisation avec l’amincissement sur des formes synthétiques et des images rétiniennes." },
  recall: { title: "Ajout des sessions enregistrées et des notes dans Recall", date: "2026", description: "Implémentation du stockage des enregistrements, des transcriptions, des repères et des notes structurées." },
}

const frenchProjects: Record<string, ProjectCopy> = {
  "dare-agent-reliability": {
    title: "Étude de fiabilité DARE-Bench",
    subheading: "Tests répétés d’un agent de science des données",
    summary: "Étudier si un agent IA réussit une même tâche de façon constante.",
    description: "Un score moyen peut masquer des résultats variables. J’ai étudié si accorder davantage de tours à un agent de science des données améliore à la fois son taux de réussite et la constance de ses résultats. Un tour correspond à un cycle où l’agent écrit du code, l’exécute et examine le résultat.",
    imageAlt: "Résultats de l’étude de fiabilité DARE-Bench",
    details: {
      headings: { motivation: "Question de recherche", built: "Protocole de l’étude", technicalDetails: "Dispositif d’évaluation", outcome: "Résultats et limites" },
      motivation: "Un agent qui réussit une tâche peut-il la réussir à nouveau ? J’ai comparé des tentatives répétées plutôt qu’un seul résultat par tâche.",
      built: [
        "Un ensemble fixe de 24 tâches de science des données, chacune répétée cinq fois avec des limites de trois et cinq tours, soit 240 exécutions.",
        "Une évaluation avec l’outil officiel de DARE-Bench, puis une analyse des tâches toujours réussies, toujours échouées ou aux résultats variables.",
        "Des scripts pour vérifier les fichiers de résultats et reproduire les tableaux et les figures.",
      ],
      technicalDetails: [
        "L’étude utilise l’agent de DARE-Bench sans modification, avec une version fixe de GPT-4.1 mini et un environnement isolé Docker.",
        "Le modèle et les tâches restent identiques pour les deux limites de tours.",
      ],
      role: "J’ai conçu et mené cette étude indépendante, analysé les résultats et documenté l’expérience.",
      outcome: "Le taux de réussite est passé de 34,2 % avec trois tours à 50 % avec cinq. Les tâches aux résultats variables—certaines répétitions réussies, d’autres échouées—sont également passées de 7 à 10 sur 24. Davantage de tours a amélioré la réussite moyenne sans rendre toutes les tâches constantes ; certaines tâches auparavant toujours échouées ont commencé à réussir occasionnellement. Cela ne démontre pas que davantage de tours rend toujours les agents moins fiables. Ces résultats concernent un seul modèle et un ensemble fixe de tâches.",
    },
  },
  smartimport: {
    title: "SmartImport",
    subheading: "Comparaison de devis fournisseurs",
    summary: "Comparer les devis, les articles manquants et le coût total d’un achat.",
    description: "Le devis le moins cher peut omettre des produits ou certains frais. Pendant mon stage chez Bounaim Auto, j’ai développé SmartImport pour rendre ces différences visibles avant une décision d’achat.",
    imageAlt: "Interface de comparaison des devis SmartImport",
    details: {
      headings: { motivation: "Le problème", built: "Ce que j’ai réalisé", technicalDetails: "Fonctionnement", outcome: "Évaluation et portée" },
      motivation: "Il est difficile de comparer équitablement les totaux lorsque les offres comportent des articles, des quantités, des devises et des frais différents.",
      built: [
        "La gestion des besoins d’achat et la comparaison des devis, avec les articles manquants.",
        "La conversion des devises, le calcul des frais supplémentaires et l’enregistrement des analyses.",
        "L’import de PDF et de tableurs avec vérification humaine des informations extraites par l’IA, ainsi que l’export des analyses.",
      ],
      technicalDetails: [
        "Les calculs financiers sont effectués côté serveur avec FastAPI. L’IA propose des informations extraites et des correspondances entre articles ; une personne les vérifie avant leur enregistrement.",
        "Une interface React accède aux données PostgreSQL par l’API. Les tests couvrent les règles côté serveur et le comportement de l’interface.",
      ],
      role: "J’ai développé l’application pendant mon stage en ingénierie logicielle et IA chez Bounaim Auto.",
      outcome: "Sur des données d’évaluation synthétiques, le système a retrouvé le bon besoin d’achat dans 12 des 13 cas évalués (92,31 %). Ce résultat mesure le rapprochement des articles, pas la qualité des fournisseurs, le choix du meilleur fournisseur ni la précision en production. Le dépôt public contient l’implémentation et les éléments d’évaluation ; il n’existe pas de démo publique en ligne.",
    },
  },
  recall: {
    title: "Recall",
    subheading: "Enregistrement, transcription et notes",
    summary: "Un prototype mobile pour enregistrer les conversations et créer des notes.",
    description: "Je développe Recall pour retrouver plus facilement le contenu des conversations enregistrées. L’application associe enregistrement local, transcription, repères et notes générées à partir du texte.",
    imageAlt: "Visuel du projet Recall avec une forme d’onde audio abstraite, pas une capture de l’application",
    details: {
      headings: { motivation: "Ce que j’explore", built: "Fonctions déjà implémentées", technicalDetails: "Stockage des sessions", outcome: "État actuel" },
      motivation: "Un enregistrement doit rester utile même lorsqu’un service d’IA est indisponible. Je sépare l’enregistrement local de la transcription et de la génération de notes.",
      built: [
        "L’enregistrement et la transcription en direct, avec des sessions enregistrées, la lecture audio et des repères.",
        "Des résumés, points clés, actions à suivre et chapitres thématiques générés à partir de la transcription.",
        "Des traitements relançables qui préservent l’audio et les transcriptions lorsqu’une requête échoue.",
      ],
      technicalDetails: [
        "Les transcriptions originales et corrigées par l’IA restent séparées. Le texte sélectionné sert au traitement, sans être considéré comme une vérité garantie.",
        "Les sessions et les notes générées sont stockées dans SQLite. Les clés d’API permanentes restent côté serveur.",
        "Les notes sont signalées comme obsolètes lorsque leur transcription source change.",
      ],
      role: "Je développe l’application mobile, le serveur, le stockage et les traitements.",
      outcome: "Il s’agit d’un prototype en développement, pas d’une application publiée. Les enregistrements et les notes déjà générées sont accessibles hors ligne ; la transcription et la génération de notes nécessitent une connexion. La transcription de conversations mêlant plusieurs langues nécessite encore des tests, ainsi que des vérifications supplémentaires sur appareil.",
    },
  },
  medskel: {
    title: "medskel",
    subheading: "Mesure des vaisseaux sanguins à partir d’images",
    summary: "Tester une méthode publiée de mesure des lignes centrales des vaisseaux.",
    description: "Deux personnes peuvent tracer différemment un même vaisseau sanguin. J’ai étudié l’effet de ces différences sur les mesures obtenues après réduction des vaisseaux tracés à leurs lignes centrales.",
    imageAlt: "Expériences de squelettisation et mesures vasculaires avec medskel",
    details: {
      headings: { motivation: "Question de recherche", built: "Implémentation et expériences", technicalDetails: "Méthode de mesure", outcome: "Résultats et limites" },
      motivation: "Simplifier le contour d’un vaisseau rend-il les mesures moins sensibles aux différences entre les tracés de deux personnes ?",
      built: [
        "Une implémentation Python de la méthode de squelettisation publiée par Saidou, Zineddine et Rhazzaf en 2024.",
        "Des outils de mesure et des vérifications sur des formes de géométrie connue.",
        "Des expériences comparant la méthode à l’amincissement de pixels, dont 28 images rétiniennes tracées par deux observateurs.",
      ],
      technicalDetails: [
        "Le traitement simplifie le contour, construit un squelette à partir d’un diagramme de Voronoï et mesure les branches obtenues.",
        "Une construction indépendante par front d’onde vérifie des formes convexes simples ; elle ne prend pas en charge toutes les formes concaves.",
      ],
      role: "J’ai implémenté la méthode publiée, conçu les expériences et évalué les résultats.",
      outcome: "Pour la configuration évaluée, l’écart relatif médian entre observateurs sur la longueur totale des vaisseaux était de 3,2 %, contre 9,3 % pour l’amincissement. En revanche, les positions des lignes centrales concordaient moins bien et le traitement était plus lent. Un meilleur accord entre observateurs ne démontre ni une meilleure exactitude ni une validité clinique.",
    },
  },
  "uemf-presence": {
    title: "UEMF Presence",
    subheading: "Suivi des présences à l’université",
    summary: "Un projet universitaire avec pointage GPS et QR renouvelé régulièrement.",
    description: "Réalisé avec trois camarades de classe pour un module de recherche opérationnelle à l’EIDIA, ce système associe emplois du temps récurrents, pointage GPS et QR renouvelé régulièrement, historique des présences et vérification par les enseignants.",
    imageAlt: "Tableau de bord UEMF Presence avec des données de démonstration",
    details: {
      headings: { built: "Gestion des présences", technicalDetails: "Pointage et vérification", outcome: "Portée de la démo" },
      built: [
        "Des tableaux de bord distincts pour les étudiants, les enseignants et les administrateurs.",
        "Des emplois du temps récurrents, le pointage, l’historique des présences et des rapports CSV.",
      ],
      technicalDetails: [
        "Les jetons QR utilisent HMAC-SHA256 et changent toutes les 10 secondes.",
        "Les pointages suspects sont signalés pour vérification, sans être considérés comme des preuves de fraude.",
      ],
      outcome: "Le déploiement public est une démonstration utilisant des données fictives, pas un service exploité par l’université.",
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
  return experiences.map((experience) => ({ ...experience, ...frenchExperience[experience.id] }))
}

export function getLocalizedMilestones(locale: Locale) {
  if (locale === "en") return milestones
  return milestones.map((milestone) => ({ ...milestone, ...frenchMilestones[milestone.id] }))
}

export function getLocalizedProject(project: Project, locale: Locale): Project {
  if (locale === "en") return project
  const translation = frenchProjects[project.slug]
  if (!translation) return project
  return { ...project, ...translation, details: { ...translation.details } }
}

export function getLocalizedProjects(locale: Locale) {
  return projects.map((project) => getLocalizedProject(project, locale))
}

export function getLocalizedSkillsVenn(locale: Locale) {
  return { image: profile.avatar, skills: getMessages(locale).home.venn }
}

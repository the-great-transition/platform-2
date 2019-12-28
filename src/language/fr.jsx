export const login = {
  email: "Courriel :",
  password: "Mot de passe :",
  remember: "Se souvenir de moi :",
  submit: "Soumettre"
};

export const nav = {
  welcome: "Bienvenue",
  profile: "Profil",
  dashboard: "Tableau de bord",
  submissions: "Soumissions",
  participants: "Participant·e·s",
  schedule: "Horaire",
  translation: "Traduction",
  admin: "Administration",
  logout: "Déconnexion",
  erratum: "Page introuvable."
};

export const submissions = {
  title: "Soumissions",
  displayed: "affichées",
  submitted: "Soumise le",
  modify: "Modifier",
  description: "Description",
  columns: [
    {
      title: "Type",
      field: "type",
      lookup: { 0: "Communication", 1: "Panel", 2: "Atelier" }
    },
    { title: "De", field: "submittedby", filtering: false },
    { title: "Titre", field: "title", filtering: false },
    { title: "Moy", field: "average", filtering: false },
    {
      title: "Langue",
      field: "language",
      lookup: { 0: "Français", 1: "Anglais", 2: "Bilingue" }
    },
    {
      title: "Niveau",
      field: "level",
      lookup: { 0: "Non défini", 1: "Introductif", 2: "Avancé" }
    },
    {
      title: "Thème",
      field: "theme",
      lookup: {
        0: "Aucun",
        1: "Une économie pour tout le monde",
        2: "Transformer notre rapport à la nature",
        3: "L'anti-impérialisme dans un monde turbulent",
        4: "Repenser la démocratie et le pouvoir",
        5: "Décoloniser les savoirs",
        6: "Lutter contre les oppressions"
      }
    },
    {
      title: "Orientation",
      field: "orientation",
      lookup: { 0: "Aucune", 1: "Stratégie", 2: "Modèles" }
    }
  ],
  type: [
    { label: "Soumises", value: "0" },
    { label: "Rejetées", value: "1" },
    { label: "Acceptées", value: "2" },
    { label: "Confirmées", value: "3" },
    { label: "Annulées", value: "4" }
  ]
};

export const submission = {
  previous: "Précédente",
  next: "Suivante",
  escape: "ESC",
  submittedon: "En date du ",
  by: "de",
  type: {
    label: submissions.columns[0].title,
    lookup: submissions.columns[0].lookup
  },
  submittedby: submissions.columns[2].title,
  title: submissions.columns[3].title,
  description: "Description",
  language: {
    label: submissions.columns[4].title,
    lookup: submissions.columns[4].lookup
  },
  level: {
    label: submissions.columns[5].title,
    lookup: submissions.columns[5].lookup
  },
  theme: {
    label: submissions.columns[6].title,
    lookup: submissions.columns[6].lookup
  },
  orientation: {
    label: submissions.columns[7].title,
    lookup: submissions.columns[7].lookup
  },
  status: {
    0: "Soumise",
    1: "Rejetée",
    2: "Acceptée",
    3: "Confirmée",
    4: "Annulée"
  },
  myRating: "Mon évaluation : ",
  averageRating: "Évaluation moyenne : ",
  details: "Détails"
};

export const admin = {
  menu_config: "Configuration",
  menu_users: "Membres",
  users: {
    select: "Sélectionnez :",
    create: "Créez une entrée : ",
    new: "<Nouvelle entrée>"
  },
  user: {
    name: "Nom :",
    email: "Courriel :",
    password: "Modifier le mot de passe :",
    password_email: "Envoyer par courriel à ",
    role: "Rôle : ",
    submit: "Soumettre",
    reset: "Rétablir",
    cancel: "Annuler"
  },
  roles: [
    { label: "Administrateur·trice", value: 0 },
    { label: "Éditeur·trice en chef", value: 1 },
    { label: "Éditeur·trice", value: 2 },
    { label: "Organisateur·trice", value: 3 },
    { label: "Traducteur·trice", value: 4 },
    { label: "Membre", value: 5 }
  ]
};

export const errors_input = {
  "any.default": "L'entrée est erronée",
  "any.required": "L'entrée est requise",
  "number.greater": "L'entrée doit être plus grande que ",
  "number.less": "L'entrée doit être plus petite que ",
  "number.integer": "L'entrée doit être un chiffre valide",
  "number.max": "L'entrée est trop longue, maximum de ",
  "number.min": "L'entrée n'est pas assez longue, minimum de ",
  "number.negative": "L'entrée doit être négative",
  "number.positive": "L'entrée doit être positive",
  "string.email": "L'entrée doit être une adresse courriel",
  "string.empty": "L'entrée ne peut pas être vide",
  "string.max": "L'entrée est trop longue, maximum de ",
  "string.min": "L'entrée n'est pas assez longue, minimum de ",
  "string.uri": "L'entrée doit être un URI valide"
};

export const trslError = item => {
  item["message"] = errors_input[item.type] + item.context.value;
  if (item.context.value) item["message"] += item.context.value;
  else if (item.context.limit) item["message"] += item.context.limit;
  return item;
};

export const http = {
  unexpected: "Une erreur inattendue s'est produite.",
  unauthorized: "Vous n'avez pas l'autorisation.",
  post_success: "Entrée effectuée avec succès.",
  post_fail: "L'entrée n'a pas pu être effectuée.",
  delete_success: "L'entrée a été mise à la corbeille.",
  delete_fail: "L'entrée n'a pas pu être mise à la corbeille."
};

export const materialTable = {
  body: {
    emptyDataSourceMessage: "Aucun élément à afficher",
    addTooltip: "Ajouter",
    deleteTooltip: "Supprimer",
    editTooltip: "Visionner",
    filterRow: {
      filterTooltip: "Filtrer"
    },
    editRow: {
      deleteText: "Voulez-vous supprimer cet élément?",
      cancelTooltip: "Annuler",
      saveTooltip: "Sauvegarder"
    }
  },
  grouping: {
    placeholder: "Étirer les en-têtes…"
  },
  header: {
    actions: "Lire"
  },
  pagination: {
    labelDisplayedRows: "{from}-{to} de {count}",
    labelRowsSelect: "éléments",
    labelRowsPerPage: "Éléments par page : ",
    firstAriaLabel: "Première page",
    firstTooltip: "Première page",
    previousAriaLabel: "Page précédente",
    previousTooltip: "Page précédente",
    nextAriaLabel: "Page suivante",
    nextTooltip: "Page suivante",
    lastAriaLabel: "Dernière page",
    lastTooltip: "Dernière page"
  },
  toolbar: {
    addRemoveColumns: "Ajouter ou supprimer des colonnes",
    nRowsSelected: "{0} élément(s) sélectionné(s)",
    showColumnsTitle: "Afficher les colonnes",
    showColumnsAriaLabel: "Afficher les colonnes",
    exportTitle: "Exporter",
    exportAriaLabel: "Exporter",
    exportName: "Exporter en CSV",
    searchTooltip: "Recherche",
    searchPlaceholder: "Recherche"
  }
};

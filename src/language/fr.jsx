export const moment_locale = {
  months: "Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre".split(
    "_"
  ),
  monthsShort: "Janv._Févr._Mars_Avr._Mai_Juin_Juil._Août_Sept._Oct._Nov._Déc.".split(
    "_"
  ),
  monthsParseExact: true,
  weekdays: "Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi".split("_"),
  weekdaysShort: "Dim._Lun._Mar._Mer._Jeu._Ven._Sam.".split("_"),
  weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd D MMMM YYYY HH:mm"
  },
  calendar: {
    sameDay: "[Aujourd’hui à] LT",
    nextDay: "[Demain à] LT",
    nextWeek: "dddd [à] LT",
    lastDay: "[Hier à] LT",
    lastWeek: "dddd [dernier à] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "dans %s",
    past: "il y a %s",
    s: "quelques secondes",
    m: "une minute",
    mm: "%d minutes",
    h: "une heure",
    hh: "%d heures",
    d: "un jour",
    dd: "%d jours",
    M: "un mois",
    MM: "%d mois",
    y: "un an",
    yy: "%d ans"
  },
  dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
  ordinal: function(number) {
    return number + (number === 1 ? "er" : "");
  },
  meridiemParse: /PD|MD/,
  isPM: function(input) {
    return input.charAt(0) === "M";
  },
  meridiem: function(hours, minutes, isLower) {
    return hours < 12 ? "PD" : "MD";
  },
  week: {
    dow: 1,
    doy: 4
  }
};

export const email = {
  from: "Comité éditorial GT",
  forgotPasswordSubject: "Mot de passe oublié",
  forgotPasswordBody:
    "Voici le nouveau mot de passe avec lequel vous pouvez vous connecter sur notre plateforme : #/PASSWORD/#",
  forgotPasswordSent: "Un mot de passe a été envoyé.",
  forgotPasswordFail: "Échec dans l'envoi du mot de passe.",
  automatic:
    "Ce message a été envoyé automatiquement via la plateforme Web du comité éditorial.",
  website: "lagrandetransition.net"
};

export const login = {
  imagealt: "La Grande transition 2020 : Construire l'utopie",
  login: "Connexion",
  email: "Courriel :",
  password: "Mot de passe :",
  fail: "Vos informations sont erronées.",
  submit: "Soumettre",
  forgot: "Mot de passe oublié?",
  sendpassword: "Renvoyer un nouveau mot de passe à l'adresse suivante : ",
  passwordsent:
    "Un nouveau mot de passe a été envoyé à votre adresse courriel.",
  collective: "Collectif La Grande transition"
};

export const nav = {
  welcome: "Bienvenue",
  profile: "Profil",
  dashboard: "Tableau de bord",
  submissions: "Soumissions",
  panelists: "Panélistes",
  associate: "Associer",
  schedule: "Horaire",
  translation: "Traduction",
  modify: "Modifier",
  exports: "Exporter",
  admin: "Administration",
  logout: "Déconnexion",
  erratum: "Page introuvable."
};

export const submissions = {
  loading: "Téléchargement...",
  title: "Soumissions",
  displayed: "affichées",
  submitted: "Soumise le",
  view: "Visionner",
  reset: "Rétablir",
  create: "Créer",
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
    { title: "Cotée", field: "rated", lookup: { true: "Oui", false: "Non" } },
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
  status: [
    { name: "status", label: "Soumises", value: "0" },
    { name: "status", label: "Rejetées", value: "1" },
    { name: "status", label: "Acceptées", value: "2" },
    { name: "status", label: "Confirmées", value: "3" },
    { name: "status", label: "Annulées", value: "4" },
    { name: "status", label: "Supprimées", value: "99" }
  ]
};

export const submission = {
  previous: "Précédente",
  next: "Suivante",
  escape: "ESC",
  modify: "Modifier la soumission",
  submittedon: "En date du ",
  myRating: "Mon évaluation : ",
  averageRating: "Évaluation moyenne : ",
  by: "de",
  type: {
    label: submissions.columns[0].title,
    lookup: submissions.columns[0].lookup
  },
  submittedby: submissions.columns[1].title,
  title: submissions.columns[2].title,
  description: "Description",
  language: {
    label: submissions.columns[5].title,
    lookup: submissions.columns[5].lookup
  },
  level: {
    label: submissions.columns[6].title,
    lookup: submissions.columns[6].lookup
  },
  theme: {
    label: submissions.columns[7].title,
    lookup: submissions.columns[7].lookup
  },
  orientation: {
    label: submissions.columns[8].title,
    lookup: submissions.columns[8].lookup
  },
  status: {
    0: "Soumise",
    1: "Rejetée",
    2: "Acceptée",
    3: "Confirmée",
    4: "Annulée",
    99: "Supprimée"
  },
  commsnum: "Nombre de communications",
  part: "Panéliste",
  chair: "Animateur·trice",
  comm: "Communication",
  information: "Informations supplémentaires"
};

export const part = {
  fname: "Prénom",
  lname: "Nom de famille",
  email: "Courriel",
  affiliation: "Implication(s) et affiliation(s)",
  city: "Ville",
  country: "Pays",
  gender: "Genre",
  minority: "Cette personne est...",
  bio: "Biographie",
  previous: "Précédent·e",
  next: "Suivant·e",
  modify: "Modifier son profil"
};

export const comments = {
  comments: "Commentaires",
  myComment: "Ajouter un commentaire",
  submit: "Soumettre",
  delete: "Supprimer",
  none: "Aucun commentaire pour l'instant."
};

export const submissionCreate = {
  createTitle: "Créer une nouvelle soumission",
  title: "Titre",
  description: "Description",
  typeLabel: "Type",
  languageLabel: "Language",
  levelLabel: "Niveau",
  themeLabel: "Thème",
  orientationLabel: "Orientation",
  statusLabel: "Statut",
  infoLabel: "Informations supplémentaires",
  type: [
    { name: "type", label: "Communication", value: 0 },
    { name: "type", label: "Panel", value: 1 },
    { name: "type", label: "Atelier", value: 2 }
  ],
  language: [
    { name: "language", label: "Français", value: 0 },
    { name: "language", label: "Anglais", value: 1 },
    { name: "language", label: "Bilingue", value: 2 }
  ],
  level: [
    { name: "level", label: "Non défini", value: 0 },
    { name: "level", label: "Introductif", value: 1 },
    { name: "level", label: "Avancé", value: 2 }
  ],
  theme: [
    { name: "theme", label: "Aucun", value: 0 },
    { name: "theme", label: "Une économie pour tout le monde", value: 1 },
    { name: "theme", label: "Transformer notre rapport à la nature", value: 2 },
    {
      name: "theme",
      label: "L'anti-impérialisme dans un monde turbulent",
      value: 3
    },
    { name: "theme", label: "Repenser la démocratie et le pouvoir", value: 4 },
    { name: "theme", label: "Décoloniser les savoirs", value: 5 },
    { name: "theme", label: "Lutter contre les oppressions", value: 6 }
  ],
  orientation: [
    { name: "orientation", label: "Aucune", value: 0 },
    { name: "orientation", label: "Stratégie", value: 1 },
    { name: "orientation", label: "Modèles", value: 2 }
  ],
  status: [
    { name: "status", label: "Soumise", value: 0 },
    { name: "status", label: "Rejetée", value: 1 },
    { name: "status", label: "Acceptée", value: 2 },
    { name: "status", label: "Confirmée", value: 3 },
    { name: "status", label: "Annulée", value: 4 },
    { name: "status", label: "Supprimée", value: 99 }
  ],
  submit: "Soumettre",
  reset: "Rétablir",
  cancel: "Annuler",
  user: "Liée à quel·le membre?"
};

export const panelists = {
  loading: "Téléchargement...",
  reset: "Rétablir",
  title: "Panélistes",
  view: "Visionner",
  create: "Ajouter",
  columns: [
    {
      title: "Nom",
      field: "fullname",
      filtering: false
    },
    {
      title: "Affiliation(s)",
      field: "affiliation",
      filtering: false
    },
    {
      title: "Ville",
      field: "city"
    },
    {
      title: "Pays",
      field: "country"
    },
    {
      title: "Genre",
      field: "gender"
    },
    {
      title: "Minorité",
      field: "minority"
    }
  ],
  status: [
    { name: "status", label: "En attente", value: "0" },
    { name: "status", label: "Confirmé·e·s", value: "1" },
    { name: "status", label: "Rejeté·e·s", value: "2" },
    { name: "status", label: "Supprimé·e·s", value: "99" }
  ]
};

export const panelistCreate = {
  createTitle: "Ajouter un·e panéliste",
  submit: "Soumettre",
  reset: "Rétablir",
  cancel: "Annuler",
  fname: part.fname,
  lname: part.lname,
  pronouns: "Pronom(s)",
  email: part.email,
  photo: part.fphotoname,
  affiliation: part.affiliation,
  bio: part.bio,
  city: part.city,
  country: part.country,
  gender: part.gender,
  minority: part.minority,
  user: "Lié·e à quel·le membre?"
};

export const associate = {
  menu_comms: "Communications -> Panels",
  menu_panelists: "Panélistes -> Soumissions",
  comms_title: "Associer des communications",
  panelists_title: "Associer des panélistes",
  comms_header: "Associer des communications à des panels",
  panelists_header: "Associer des panélistes à des soumissions",
  panel_select: "Choisir un panel : ",
  comms_select: "Choisir une communication : ",
  panelists_select: "Choisir un·e panéliste",
  comms: "Communications actuelles",
  parts: "Panélistes",
  average: "Évaluation moyenne",
  associate: "Associer",
  dissociate: "Dissocier",
  addComm: "Ajouter une communication",
  addPart: "Ajouter un·e panéliste",
  confirmAssociate: "Confirmer l'ajout"
};

export const schedule = {
  submit: "Soumettre",
  modify: "Modifier",
  cancel: "Annuler",
  delete: "Supprimer",
  menu_timeslots: "Plages",
  menu_rooms: "Salles",
  menu_rooms_timeslots: "Salles -> Plages",
  menu_panels_rooms: "Panels -> Salles",
  menu_panels_timeslots: "Panels -> Plages",
  menu_schedule: "Horaire",
  timeslots_helmet: "Plages horaire",
  timeslots_header: "Gérer les plages horaire",
  timeslots_date: "Date",
  timeslots_begin: "Début",
  timeslots_end: "Fin",
  timeslot_date: "Date : ",
  timeslot_begin: "Début : ",
  timeslot_end: "Fin : ",
  timeslot_new: "Nouveau bloc horaire",
  timeslot_modify: "Modifier un bloc horaire",
  rooms_helmet: "Salles",
  rooms_header: "Gérer les salles",
  rooms_timeslots_helmet: "Salles et plages horaire",
  rooms_timeslots_header: "Associer des salles aux plages horaire",
  rooms_location: "Lieu",
  rooms_capacity: "Capacité",
  rooms_type: "Type",
  rooms_type_options: [
    { name: "type", value: 0, label: "Mobilier amovible" },
    { name: "type", value: 1, label: "Mobilier fixe" }
  ],
  rooms_av: "Audiovisuel",
  rooms_av_options: [
    { name: "av", value: 0, label: "Audio seulement" },
    { name: "av", value: 1, label: "Vidéo seulement" },
    { name: "av", value: 2, label: "Audiovisuel sans caméra" },
    { name: "av", value: 3, label: "Audiovisuel avec caméra" }
  ],
  rooms_comments: "Commentaires",
  room_new: "Nouvelle salle",
  room_modify: "Modifier une salle",
  room_location: "Lieu (nom de la salle) : ",
  room_capacity: "Capacité : ",
  room_type: "Type : ",
  room_av: "Audiovisuel?",
  room_comments: "Commentaires : ",
  panels_rooms_helmet: "Panels et salles",
  panels_rooms_header: "Associer des panels à des salles",
  panels_timeslots_helmet: "Panels et plages horaire",
  panels_timeslots_header: "Associer des panels à des plages horaire",
  schedule_helmet: "Horaire",
  schedule_header: "Visionner l'horaire"
};

export const exports = {
  menu_comments: "Commentaires",
  menu_answers: "Réponses",
  menu_emails: "Courriels",
  comms_helmet: "Exporter des commentaires",
  comms_header:
    "Exporter tous les commentaires selon le statut des soumissions",
  answers_helmet: "Exporter les réponses",
  answers_header: "Exporter toutes les réponses aux soumissions acceptées",
  optionsLabel: "Sélectionnez un statut de soumission : ",
  table: "Exporter en tableau",
  csv: "Exporter en format CSV",
  print: "Imprimer le tableau",
  titlePart: "Titre et panélistes",
  answers: ["Aucune", "Oui", "Non", "Peut-être"],
  tableComments: "Commentaires : ",
  chair: "Animateur·trice : ",
  nochair: "Besoin de nommer un·e animateur·trice"
};

export const modify = {
  menu_submissions: "Soumissions",
  menu_panelists: "Panélistes",
  submissions_header: "Modifier une soumission",
  submissions_title: "Modifier une soumission",
  submissions_select: "Choisir une soumission : ",
  panelists_header: "Modifier un·e panéliste",
  panelists_title: "Modifier un·e panéliste",
  panelists_select: "Choisir un·e panéliste : ",
  return: "Retour"
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

export const confirm = [
  {
    imagealt: "La Grande transition 2020 : Construire l'utopie",
    indicate: "Veuillez indiquer votre disponibilité...",
    title: "Titre : ",
    communication: "Communication",
    workshop: "Atelier",
    panel: "Cette communication fera partie du panel : ",
    panelist: "En tant que panéliste : ",
    chair: "En tant qu'animateur·trice : ",
    answer: "Réponse : ",
    answers: [
      { name: "answers", label: "Oui", value: 1 },
      { name: "answers", label: "Non", value: 2 },
      { name: "answers", label: "Peut-être", value: 3 }
    ]
  },
  {
    imagealt: "The Great Transition 2020: Building Utopias",
    indicate: "Please indicate your availability...",
    title: "Title: ",
    communication: "Communication",
    workshop: "Workshop",
    panel: "This communication will be a part of the panel:",
    panelist: "As speaker:",
    chair: "As chair:",
    answer: "Response: ",
    answers: [
      { name: "answers", label: "Yes", value: 1 },
      { name: "answers", label: "No", value: 2 },
      { name: "answers", label: "Maybe", value: 3 }
    ]
  }
];

export const errors_input = {
  "any.default": "L'entrée est erronée",
  "any.empty": "L'entrée est vide",
  "any.required": "L'entrée est requise",
  "number.greater": "L'entrée doit être plus grande que ",
  "number.less": "L'entrée doit être plus petite que ",
  "number.integer": "L'entrée doit être un chiffre valide",
  "number.max": "L'entrée est trop longue, maximum de ",
  "number.min": "L'entrée n'est pas assez longue, minimum de ",
  "number.negative": "L'entrée doit être négative",
  "number.positive": "L'entrée doit être positive",
  "object.base": "Vous devez choisir un élément",
  "string.email": "L'entrée doit être une adresse courriel",
  "string.empty": "L'entrée ne peut pas être vide",
  "string.max": "L'entrée est trop longue, maximum de ",
  "string.min": "L'entrée n'est pas assez longue, minimum de ",
  "string.uri": "L'entrée doit être un URI valide"
};

export const trslError = item => {
  item["message"] = errors_input[item.type];
  if (item.context.limit) item["message"] += item.context.limit;
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

export const auth = {
  fail: "La tentative de connexion a échoué."
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

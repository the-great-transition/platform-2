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

export const http = {
  unexpected: "Une erreur inattendue s'est produite.",
  unauthorized: "Vous n'avez pas l'autorisation.",
  post_success: "Entrée effectuée avec succès.",
  post_fail: "L'entrée n'a pas pu être effectuée.",
  delete_success: "L'entrée a été mise à la corbeille.",
  delete_fail: "L'entrée n'a pas pu être mise à la corbeille."
};

import { form } from './form';
import { page } from './page';

export const fr = {
  translation: {
    app: {
      title: 'React (Scalable)',
      description: 'Une application scalable',
      header: {
        title: 'Accueil',
        profile: 'Mon profil',
        logout: 'Deconnexion',
      },
      form,
      page,
      error: {
        unknown: 'Une erreur est survenue, veuillez réessayer.',
      },
      modal: {
        'session-expired': {
          title: 'Votre session a expiré',
          body: 'Veuillez vous reconnecter',
          home: "Retourner à l'accueil",
          login: 'Se connecter',
        },
      },
    },
  },
};

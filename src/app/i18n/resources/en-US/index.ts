import { form } from './form';
import { page } from './page';

export const enUS = {
  translation: {
    app: {
      title: 'React (Scalable)',
      description: 'A scalable application',
      layout: {
        auth: {
          title: 'Sparta',
          content: 'Your fitness journey starts here',
        },
      },
      header: {
        title: 'Home',
        profile: 'My profile',
        logout: 'Logout',
      },
      form,
      page,
      error: {
        unknown: 'An error occured, please try again.',
      },
      modal: {
        'session-expired': {
          title: 'Your session has expired',
          body: 'Please reconnect.',
          home: 'Go to Home',
          login: 'Go to Login',
        },
      },
    },
  },
};

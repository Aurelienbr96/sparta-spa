import { loginListener, registerListener } from '@app/modules/user';

import { listenerMiddleware } from './store';

export const listeners: Array<(middleware: typeof listenerMiddleware) => void> = [loginListener, registerListener];

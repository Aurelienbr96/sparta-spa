import { loginListener } from '@app/modules/user';
import { listenerMiddleware } from './store';
import { registerListener } from '@app/modules/user/redux/register';

export const listeners: Array<(middleware: typeof listenerMiddleware) => void> = [loginListener, registerListener];

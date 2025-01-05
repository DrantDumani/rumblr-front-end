import { Auth } from '../pages/auth/Auth';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { authAction } from '../utils/actions';
import { authLoader } from '../utils/loaders';

export const routes = [
  {
    element: <Dashboard />,
    path: '/',
  },
  {
    element: <Auth />,
    path: '/auth',
    action: authAction,
    loader: authLoader,
  },
];

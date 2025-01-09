import { Auth } from '../pages/auth/Auth';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { authAction } from '../utils/actions';
import { authLoader, dashboardLoader } from '../utils/loaders';

export const routes = [
  {
    element: <Dashboard />,
    path: '/',
    loader: dashboardLoader,
  },
  {
    element: <Auth />,
    path: '/auth',
    action: authAction,
    loader: authLoader,
  },
];

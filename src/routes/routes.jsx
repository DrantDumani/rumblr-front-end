import { Auth } from '../pages/auth/Auth';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { authAction } from '../utils/actions';
import { authLoader, dashboardLoader } from '../utils/loaders';
import { Index } from '../pages/Index/Index';
import { Settings } from '../pages/settings/Settings';

export const routes = [
  {
    element: <Dashboard />,
    path: '/',
    children: [
      {
        index: true,
        element: <Index />,
        loader: dashboardLoader,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
  {
    element: <Auth />,
    path: '/auth',
    action: authAction,
    loader: authLoader,
  },
];

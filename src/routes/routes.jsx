import { Auth } from '../pages/auth/Auth';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { authAction } from '../utils/actions';
import {
  authLoader,
  blogLoader,
  dashboardLoader,
  likesLoader,
  settingsLoader,
} from '../utils/loaders';
import { Index } from '../pages/Index/Index';
import { Settings } from '../pages/settings/Settings';
import { Likes } from '../pages/likes/Likes';
import { Blog } from '../pages/blog/Blog';

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
        loader: settingsLoader,
      },
      {
        path: '/likes',
        element: <Likes />,
        loader: likesLoader,
      },
      {
        path: '/blog/:userId',
        element: <Blog />,
        loader: blogLoader,
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

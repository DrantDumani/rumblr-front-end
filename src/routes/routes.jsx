import { Auth } from '../pages/auth/Auth';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { authAction } from '../utils/actions';
import {
  authLoader,
  blogLoader,
  dashboardLoader,
  likesLoader,
  searchLoader,
  settingsLoader,
  singlePostLoader,
  usersLoader,
} from '../utils/loaders';
import { Index } from '../pages/Index/Index';
import { Settings } from '../pages/settings/Settings';
import { Likes } from '../pages/likes/Likes';
import { Blog } from '../pages/blog/Blog';
import { Users } from '../pages/users/Users';
import { Search } from '../pages/search/Search';
import { PostPage } from '../pages/post/PostPage';
import { Error } from '../pages/error/Error';

export const routes = [
  {
    element: <Dashboard />,
    path: '/',
    errorElement: <Error />,
    children: [
      {
        errorElement: <Error />,
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
          {
            path: '/post/:postId',
            element: <PostPage />,
            loader: singlePostLoader,
          },
          {
            path: '/users',
            element: <Users />,
            loader: usersLoader,
          },
          {
            path: '/search',
            element: <Search />,
            loader: searchLoader,
          },
        ],
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

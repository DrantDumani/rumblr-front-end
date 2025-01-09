import { handleData } from './handleData';
import { redirect } from 'react-router';

export function authLoader() {
  const token = localStorage.getItem('token');
  if (token) {
    return redirect('/');
  }
  return true;
}

export function dashboardLoader() {
  const token = localStorage.getItem('token');
  if (!token) {
    return redirect('/auth');
  }
  // if there is a token, use it to make a request to api for dashboard posts
  return true;
}

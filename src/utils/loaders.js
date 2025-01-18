import { handleData } from './handleData';
import { redirect } from 'react-router';

export function authLoader() {
  const token = localStorage.getItem('token');
  if (token) {
    return redirect('/');
  }
  return true;
}

export async function dashboardLoader() {
  const token = localStorage.getItem('token');
  let validToken = !!token;

  if (token) {
    const resp = await handleData('posts');

    if (resp.ok) {
      const postList = await resp.json();
      return postList;
    } else if (resp.status === 401) {
      localStorage.removeItem('token');
      validToken = false;
    }

    if (!validToken) {
      return redirect('./auth');
    }
  }
}

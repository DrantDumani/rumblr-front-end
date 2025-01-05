import { handleData } from './handleData';
import { redirect } from 'react-router';

export function authLoader() {
  const token = localStorage.getItem('token');
  if (token) {
    return redirect('/');
  }
  return true;
}

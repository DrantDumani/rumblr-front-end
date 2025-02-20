import { handleData } from './handleData';
import { redirect } from 'react-router';
import { jwtDecode } from 'jwt-decode';

async function verifyTokenOnRequest(fetchReq) {
  const token = localStorage.getItem('token');
  let validToken = !!token;

  if (token) {
    const resp = await fetchReq();

    if (resp.status === 401) {
      localStorage.removeItem('token');
      validToken = false;
    } else return resp;
  }
  if (!validToken) {
    return false;
  }
}

export function authLoader() {
  const token = localStorage.getItem('token');
  if (token) {
    return redirect('/');
  }
  return true;
}

export async function dashboardLoader() {
  const req = async () => await handleData('posts');
  const resp = await verifyTokenOnRequest(req);

  if (!resp) {
    return redirect('/auth');
  } else {
    const postList = await resp.json();
    return postList;
  }
}

export async function settingsLoader() {
  const token = localStorage.getItem('token');

  if (!token) return redirect('/auth');
  const userInfo = jwtDecode(token);

  const req = async () => await handleData(`users/${userInfo.id}`);
  const resp = await verifyTokenOnRequest(req);

  if (!resp) {
    return redirect('/auth');
  } else {
    const userData = await resp.json();
    return userData;
  }
}

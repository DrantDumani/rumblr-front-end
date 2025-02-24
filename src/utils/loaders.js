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

export async function likesLoader() {
  const req = async () => await handleData('likes');
  const resp = await verifyTokenOnRequest(req);

  if (!resp) {
    redirect('/auth');
  } else {
    const likedPosts = await resp.json();
    return likedPosts;
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

export async function blogLoader({ params }) {
  const userReq = async () => handleData(`users/${params.userId}`);
  const postReq = async () => handleData(`posts/user/${params.userId}`);

  const [userInfo, posts] = await Promise.all([
    verifyTokenOnRequest(userReq),
    verifyTokenOnRequest(postReq),
  ]);

  if (!userInfo || !posts) {
    return redirect('/auth');
  } else {
    const [userData, postData] = await Promise.all([
      userInfo.json(),
      posts.json(),
    ]);
    return { userData, postData };
  }
}

export async function usersLoader() {
  const req = async () => handleData('users');
  const resp = await verifyTokenOnRequest(req);

  if (!resp) {
    return redirect('/auth');
  } else {
    const users = await resp.json();
    return users;
  }
}

export async function singlePostLoader({ params }) {
  const { postId } = params;
  const req = async () => handleData(`posts/${postId}`);
  const resp = await verifyTokenOnRequest(req);

  if (!resp) {
    return redirect('/auth');
  } else {
    const singlePost = (await resp.json()).post;
    return [singlePost];
  }
}

export async function searchLoader({ request }) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('q');

  const req = async () => handleData(`posts/tag?tagName=${searchTerm}`);
  const resp = await verifyTokenOnRequest(req);

  if (!resp) {
    return redirect('/auth');
  } else {
    const taggedPosts = await resp.json();
    return taggedPosts;
  }
}

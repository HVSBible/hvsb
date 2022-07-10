import { getCookie } from '$lib/helpers/cookies';
import { setConfig } from 'sveltefirets';
import { firebaseConfig } from '$lib/firebaseConfig';
import type { Handle, GetSession } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  setConfig(firebaseConfig);
  
  let user = null;
  try {
    user = JSON.parse(getCookie('user', event.request.headers.get('cookie')) || null);
  } catch (err) {
    console.log(err);
  }
  event.locals.user = user;

  const response = await resolve(event);
  return response;
};

export const getSession: GetSession = (request) => {
  return {
    user: request.locals.user,
  };
};

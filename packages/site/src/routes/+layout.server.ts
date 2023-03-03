import type { IUser } from '@hvsb/types';

import type { LayoutServerLoad } from './$types';
export const load = (({ cookies }) => {
  let user: IUser = null;
  try {
    user = JSON.parse(cookies.get('user') || null) as IUser;
  } catch (err) {
    console.log(err);
  }

  return {
    user,
  };
}) satisfies LayoutServerLoad;

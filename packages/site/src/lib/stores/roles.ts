import type { IUser } from '@hvsb/types';
import { derived } from 'svelte/store';
import { user } from './user';

export const admin = derived(user, ($user: IUser) => {
  if ($user?.demoted) return 0
  return $user?.roles?.admin || 0;
});

export const contributor = derived(user, ($user: IUser) => {
  if ($user?.roles?.contributor)
    return true;

  return false;

});

export const translator = derived(user, ($user: IUser) => {
  if ($user?.roles?.translator)
    return $user.roles.translator;

});

// On an article, show a "Translate" button if $translator === true, and then show appropriate language to let them translate by checking language value of $translator

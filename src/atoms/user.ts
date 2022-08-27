import { ServerPromiseResp } from '@project-error/npwd-types';
import { atom, selector } from 'recoil';
import { AdvertisementsEvents } from '../../shared/events';
import { User } from '../../shared/types';
import fetchNui from '../utils/fetchNui';
import { isEnvBrowser } from '../utils/misc';
import { MockedCreator } from '../utils/mocks';

export const userAtom = atom<User | null>({
  key: 'npwd-advertisements:user',
  default: selector<User | null>({
    key: 'npwd-advertisements:defaultUser',
    get: async () => {
      try {
        const user = await fetchNui<User>(AdvertisementsEvents.GetUser);

        if (!user) {
          console.log('no response data (user)');
          return null;
        }

        return user;
      } catch {
        if (isEnvBrowser()) {
          return MockedCreator;
        }

        return null;
      }
    },
  }),
});

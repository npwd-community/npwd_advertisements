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
        const resp = await fetchNui<ServerPromiseResp<User>>(AdvertisementsEvents.GetUser);

        console.log({ resp });

        if (!resp.data) {
          console.log('no response data (user)');
          return null;
        }

        return resp.data;
      } catch {
        if (isEnvBrowser()) {
          return MockedCreator;
        }

        return null;
      }
    },
  }),
});

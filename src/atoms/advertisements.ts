import { ServerPromiseResp } from '@project-error/npwd-types';
import { atom, selector } from 'recoil';
import { AdvertisementsEvents } from '../../shared/events';
import { Advertisement, User } from '../../shared/types';
import fetchNui from '../utils/fetchNui';
import { isEnvBrowser } from '../utils/misc';
import { MockedAdvertisements, MockedCreator } from '../utils/mocks';

export const advertisementsAtom = atom<Advertisement[]>({
  key: 'npwd-advertisements:advertisements',
  default: selector<Advertisement[]>({
    key: 'npwd-advertisements:defaultAdvertisements',
    get: async () => {
      try {
        const advertisements = await fetchNui<Advertisement[]>(
          AdvertisementsEvents.GetAdvertisements,
        );

        if (!advertisements) {
          console.log('no response data (advertisements)');
          return [];
        }

        return advertisements;
      } catch (error) {
        console.error(error);
        if (isEnvBrowser()) {
          return MockedAdvertisements;
        }

        return [];
      }
    },
  }),
});

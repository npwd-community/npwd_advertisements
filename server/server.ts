import { MockServer } from 'fivem-mock-server';
import { AdvertisementsEvents } from '../shared/events';
import { Advertisement, CreateAdvertisementInput, User } from '../shared/types';

console.log('Server started ..');

new MockServer({
  isActive: true,
  resourceName: 'npwd_advertisements',

  exports: {
    hotreload: {
      add: (val: string) => console.log('Added hotreload conf for ', val),
    },
  },
  endpoints: [
    AdvertisementsEvents.GetUser,
    AdvertisementsEvents.GetAdvertisements,
    AdvertisementsEvents.CreateAdvertisement,
  ],
});

const hotReloadConfig = {
  resourceName: GetCurrentResourceName(),
  files: ['/dist/server.js', '/dist/client.js', '/dist/html/index.js'],
};

global.exports['hotreload'].add(hotReloadConfig);

const Store = {
  Advertisements: [],
};

onNet(AdvertisementsEvents.GetUser, (responseEvent: string) => {
  console.log('handling user');
  const users: User[] = [
    {
      id: 1,
      citizenId: '123',
      name: 'Berra',
    },
  ];

  setTimeout(() => {
    emitNet(responseEvent, 0, { status: 'ok', data: { data: users } });
  }, 100);
});

onNet(AdvertisementsEvents.GetAdvertisements, (responseEvent: string) => {
  // const src = source;
  console.log('handling advertisements');

  const advertisements: Advertisement[] = [
    {
      id: 1,
      title: 'Make me rich',
      body: 'This is the main body content',
      creator: {
        id: 1,
        citizenId: '123',
        name: 'Berra',
      },
      description: 'I make me rich, by taking your money',
      isCallable: true,
      isPosition: true,
    },
  ];

  setTimeout(() => {
    emitNet(responseEvent, 0, { status: 'ok', data: { data: advertisements } });
  }, 100);
});

onNet(
  AdvertisementsEvents.CreateAdvertisement,
  (responseEvent: string, data: CreateAdvertisementInput) => {
    console.log('Creating advertisement', data);

    const advertisements: Advertisement[] = [
      {
        id: 1,
        title: 'Make me rich',
        body: 'This is the main body content',
        creator: {
          id: 1,
          citizenId: '123',
          name: 'Berra',
        },
        description: 'I make me rich, by taking your money',
        isCallable: true,
        isPosition: true,
      },
    ];

    setTimeout(() => {
      emitNet(responseEvent, 0, { status: 'ok', data: { data: true } });
    }, 100);
  },
);

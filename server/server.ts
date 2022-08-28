import { MockServer } from 'fivem-mock-server';
import { AdvertisementsEvents, ReportReason } from '../shared/events';
import {
  Advertisement,
  ReportAdvertisementInput,
  CreateAdvertisementInput,
  User,
} from '../shared/types';

import { Server as ESXServer } from 'esx.js';
import { Server as QBServer } from 'qbcore.js';

const exp = global.exports;

export let ESX: ESXServer = null;
export let QBCore: QBServer = null;

let FRAMEWORK: 'qb' | 'esx' | 'standalone' = 'standalone';

if (GetResourceState('qb-core') === 'started') {
  FRAMEWORK = 'qb';
}

if (GetResourceState('es_extended') === 'started') {
  FRAMEWORK = 'esx';
}

console.log('Loaded framework "' + FRAMEWORK + '"');

switch (FRAMEWORK) {
  case 'esx':
    ESX = exp['es_extended'].getSharedObject();
    break;
  case 'qb':
    QBCore = exp['qb-core'].GetCoreObject();
    break;
}

new MockServer({
  isActive: false,
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
    AdvertisementsEvents.DeleteAdvertisement,
    AdvertisementsEvents.ReportAdvertisement,
  ],
  players: [
    {
      license: 'license:1',
      name: 'Kalle Kula',
    },
  ],
});

global.source = 1;

const hotReloadConfig = {
  resourceName: GetCurrentResourceName(),
  files: ['/dist/server.js', '/dist/client.js', '/dist/html/index.js'],
};

if (GetResourceState('hotreload') === 'started') {
  global.exports['hotreload'].add(hotReloadConfig);
};

type ReportStore = {
  [index in ReportReason]: Record<string, User>;
};

interface IStore {
  Advertisements: Advertisement[];
  Reports: Record<Advertisement['id'] | undefined, ReportStore>;
}

const Store: IStore = {
  Advertisements: [],
  Reports: {},
};

setTimeout(() => {
  if (GetResourceState('npwd') == 'started') {
    emitNet(AdvertisementsEvents.UpdateNUI, -1);
  }
}, 200);

const getPlayerBySource = (source: number, withPhoneNumber?: boolean): User => {
  if (FRAMEWORK === 'qb') {
    const player = QBCore.Functions.GetPlayer(source);

    if (!player) {
      throw new Error('Player could not be found');
    }

    const { citizenid, charinfo } = player.PlayerData;

    return {
      citizenId: citizenid,
      name: `${charinfo.firstname} ${charinfo.lastname}`,
      phoneNumber: withPhoneNumber ? charinfo.phone.toString() : '',
    };
  }

  if (FRAMEWORK === 'esx') {
    const player = ESX.GetPlayerFromId(source);

    if (!player) {
      throw new Error('Player could not be found');
    }

    let phoneNumber: string;
    if (GetResourceState('npwd') == 'started' && withPhoneNumber) {
      phoneNumber = exp['npwd'].getPhoneNumber(source);
    }

    return {
      citizenId: player.identifier,
      name: player.name,
      phoneNumber,
    };
  }

  const name = GetPlayerName(source.toString());
  return {
    name,
    citizenId: source.toString(),
    phoneNumber: withPhoneNumber ? '112' : '',
  };
};

onNet(AdvertisementsEvents.GetUser, (responseEvent: string) => {
  const src = source;
  const user = getPlayerBySource(src);

  setImmediate(() => {
    emitNet(responseEvent, src, { status: 'ok', data: user });
  });
});

onNet(AdvertisementsEvents.GetAdvertisements, async (responseEvent: string) => {
  const src = source;
  const advertisements = Store.Advertisements.filter((advertisment) => !advertisment.deletedAt);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  setImmediate(() => {
    emitNet(responseEvent, src, { status: 'ok', data: advertisements });
  });
});

onNet(
  AdvertisementsEvents.CreateAdvertisement,
  (responseEvent: string, data: CreateAdvertisementInput) => {
    const src = source;
    const user = getPlayerBySource(src, data.isCallable);
    const waypoint = data.isPosition ? getPlayerWaypoint(src) : undefined;

    const newAdvertisement: Advertisement = {
      ...data,
      waypoint,
      id: Store.Advertisements.length,
      creator: user,
    };

    Store.Advertisements.push(newAdvertisement);

    setImmediate(() => {
      emitNet(AdvertisementsEvents.UpdateNUI, -1);
      emitNet(responseEvent, src, { status: 'ok', data: newAdvertisement });
    });
  },
);

onNet(
  AdvertisementsEvents.DeleteAdvertisement,
  (responseEvent: string, data: { advertisementId: number }) => {
    const src = source;
    const { advertisementId } = data;

    const user = getPlayerBySource(src);
    const advertisement = Store.Advertisements.find((adv) => adv.id === advertisementId);

    if (!advertisement) {
      setImmediate(() => {
        emitNet(responseEvent, src, {
          status: 'error',
          data: false,
          errorMsg: 'Could not find the advertisement!',
        });
      });
      return;
    }

    if (advertisement.creator?.citizenId !== user.citizenId) {
      setImmediate(() => {
        emitNet(responseEvent, src, {
          status: 'error',
          data: false,
          errorMsg: 'You are not the creator of this advertisement',
        });
      });
      return;
    }

    const newAdvertisements = Store.Advertisements.filter((adv) => adv.id !== advertisementId);
    Store.Advertisements = [...newAdvertisements, { ...advertisement, deletedAt: Date.now() }];

    setImmediate(() => {
      emitNet(AdvertisementsEvents.UpdateNUI, -1);
      emitNet(responseEvent, src, { status: 'ok', data: true });
    });
  },
);

onNet(
  AdvertisementsEvents.ReportAdvertisement,
  (responseEvent: string, data: ReportAdvertisementInput) => {
    const src = source;
    const player = getPlayerBySource(src);
    const { advertisementId, reason } = data;

    const currentReports = Store.Reports[advertisementId] ?? ({} as ReportStore);
    const currentReportsForReason = currentReports[reason] ?? {};
    const reportAmount = Object.keys(currentReportsForReason).length;

    const recievedTooManyReports = reportAmount + 1 >= 1;

    if (recievedTooManyReports) {
      console.debug('Deleting advertisement because of too many reports.');
      deleteAdvertisement(advertisementId);
    } else {
      Store.Reports = {
        ...Store.Reports,
        [advertisementId]: {
          ...currentReports,
          [reason]: {
            ...currentReportsForReason,
            [player.citizenId]: player,
          },
        },
      };
    }

    setImmediate(() => {
      recievedTooManyReports && emitNet(AdvertisementsEvents.UpdateNUI, -1);
      emitNet(responseEvent, src, { status: 'ok', data: true });
    });
  },
);

function deleteAdvertisement(advertisementId: number) {
  const advertisement = Store.Advertisements.find((adv) => adv.id === advertisementId);

  if (!advertisement) {
    throw new Error('Could not find advertisement');
  }

  const newAdvertisements = Store.Advertisements.filter((adv) => adv.id !== advertisementId);
  Store.Advertisements = [...newAdvertisements, { ...advertisement, deletedAt: Date.now() }];
}

function getPlayerWaypoint(src: number) {
  const pedId = GetPlayerPed(src.toString());
  const position = GetEntityCoords(pedId);
  const waypoint = {
    x: position[0],
    y: position[1],
  };

  return waypoint;
}

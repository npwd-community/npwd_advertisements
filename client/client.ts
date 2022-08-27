import { AdvertisementsEvents } from '../shared/events';
import { ClientUtils, RegisterNuiCB } from '@project-error/pe-utils';
import { AdvertisementActionInput, SetWaypointInput } from '../shared/types';

export const ClUtils = new ClientUtils({ promiseTimout: 200 });

const npwdExports = global.exports['npwd'];

onNet(AdvertisementsEvents.UpdateNUI, () => {
  npwdExports.sendUIMessage({ type: AdvertisementsEvents.UpdateNUI });
});

RegisterNuiCB<SetWaypointInput>(AdvertisementsEvents.SetWaypointAdvertisement, (data) => {
  SetNewWaypoint(data.waypoint.x, data.waypoint.y);
});

RegisterNuiProxy(AdvertisementsEvents.GetUser);
RegisterNuiProxy(AdvertisementsEvents.GetAdvertisements);
RegisterNuiProxy(AdvertisementsEvents.CreateAdvertisement);
RegisterNuiProxy(AdvertisementsEvents.DeleteAdvertisement);
RegisterNuiProxy(AdvertisementsEvents.ReportAdvertisement);
RegisterNuiProxy(AdvertisementsEvents.SetWaypointAdvertisement);

function RegisterNuiProxy(event: string) {
  RegisterNuiCallbackType(event);
  on(`__cfx_nui:${event}`, async (data: unknown, cb: CallableFunction) => {
    try {
      const res = await ClUtils.emitNetPromise(event, data);
      cb(res);
    } catch (e) {
      console.error('Error encountered while listening to resp. Error:', e);
      cb({ status: 'error' });
    }
  });
}

export enum AdvertisementsEvents {
  GetUser = 'npwd-advertisements:getUser',
  GetAdvertisements = 'npwd-advertisements:getAdvertisements',
  CreateAdvertisement = 'npwd-advertisements:createAdvertisement',
  ReportAdvertisement = 'npwd-advertisements:reportAdvertisement',
  DeleteAdvertisement = 'npwd-advertisements:deleteAdvertisement',
  SetWaypointAdvertisement = 'npwd-advertisements:setWaypoint',
  UpdateNUI = 'npwd-advertisements:updateNUI',
}

export const reportReasons = ['Offensive', 'Nonsense'] as const;
export type ReportReason = typeof reportReasons[number];

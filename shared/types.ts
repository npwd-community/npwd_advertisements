import { ReportReason } from './events';

export interface User {
  name: string;
  citizenId: string;
  phoneNumber?: string;
}

export interface Advertisement {
  id: number;
  creator: User;

  title: string;
  description: string;
  body: string;

  image?: string;

  phoneNumber?: string;

  isCallable: boolean;
  isPosition: boolean;

  waypoint?: {
    x: number;
    y: number;
  };

  reports?: number;
  deletedAt?: number;
}

export type CreateAdvertisementInput = Omit<Advertisement, 'id' | 'creator' | 'phoneNumber'>;

export type ReportAdvertisementInput = {
  advertisementId: Advertisement['id'];
  reason: ReportReason;
};

export type AdvertisementActionInput = {
  advertisementId: Advertisement['id'];
};

export type SetWaypointInput = {
  waypoint: Advertisement['waypoint'];
};

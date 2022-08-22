export interface User {
  id: number;
  name: string;
  citizenId: string;
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
}

export type CreateAdvertisementInput = Omit<Advertisement, 'id' | 'creator' | 'phoneNumber'>;

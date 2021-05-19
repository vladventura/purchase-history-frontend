export interface UserProfile {
  totalCost?: number;
  totalPrice?: number;
  totalAddedItems?: number;
  createdAt?: String;
}

export interface Item {
  id: string | any;
  name: string;
  price: number;
  cost: number;
  createdAt: string;
  username: string;
}

export interface User {
  id: string | any;
  username: string;
  token: string;
  createdAt: string;
  items?: [Item];
  profile?: UserProfile;
}

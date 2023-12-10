export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  pictureUrl: string;
}

export interface MenuItems {
  key: string;
  type: string;
  label: string;
  children?: MenuItems[];
}

export interface IMessage {
  text: string;
  timestamp: string;
  sender: string | undefined;
}

export interface IRouteChildren {
  children: JSX.Element
}
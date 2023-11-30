export interface User {
  name: string;
  id: number;
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

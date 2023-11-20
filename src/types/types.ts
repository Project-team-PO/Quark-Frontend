// types.ts
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

export type MailInfo = {
  email: string;
  password: string;
};

// types.ts
import { IMessageGroup } from "./interfaces";

export type MessageProps = {
  index: number;
  message: IMessageGroup;
};

export type MailInfo = {
  email: string;
  password: string;
};

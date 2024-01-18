// types.ts
import { IMessageGroup } from "./interfaces";

export type MessageProps = {
  message: IMessageGroup;
};

export type MailInfo = {
  email: string;
  password: string;
};

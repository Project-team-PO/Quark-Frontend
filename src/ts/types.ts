// types.ts
import { IMessage } from "./interfaces";

export type MessageProps = {
  index: number;
  message: IMessage;
};

export type MailInfo = {
  email: string;
  password: string;
};

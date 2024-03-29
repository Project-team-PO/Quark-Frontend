export interface Announcement {
  title: string;
  content: string;
  email: string;
  time: string;
}

export interface AnnouncementResponse {
  id: number;
  title: string;
  content: string;
  time: string;
  userFirstName: string;
  userLastName: string;
  userPictureUrl: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  pictureUrl: string;
  username: string;
}

export interface IMessage {
  text: string;
  timestamp: string;
  sender: string | undefined;
}

export interface IRouteChildren {
  children: JSX.Element;
}

export interface IMessageGroup {
  id: number;
  timestamp: string;
  username: string;
  text: string;
}

export interface ISendMessage {
  timestamp: string;
  username: string;
  text: string;
}

export interface IConversation {
  id: number;
  name: string;
  isPrivate: boolean;
  users: User[];
}

export interface IConversationWindow {
  username: string;
  text: string;
  date: Date;
  timestamp: string;
  messages: IMessageGroup[];
}

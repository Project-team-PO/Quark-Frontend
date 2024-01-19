import * as signalR from "@microsoft/signalr";

import { IMessageGroup, ISendMessage } from "../ts/interfaces";

const URL = "http://localhost:5253/QuarkHub"; //or whatever your backend port is
class Connector {
  private connection: signalR.HubConnection;
  public chatEvents: (
    onMessageRecieved: (message: IMessageGroup) => void,
    onShowConversation: (conversationMessages: IMessageGroup[]) => void
  ) => void;
  public conversationEvents: (
    onInitiatePrivateConversation: (username: string) => void
  ) => void;
  static instance: Connector;
  constructor(groupName: string) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(URL)
      .withAutomaticReconnect()
      .build();
    this.connection
      .start()
      .then(() => {
        console.log("Connection started successfully!");
        this.OpenConversation(groupName);
      })
      .catch((err) => document.write(err));

    this.chatEvents = (onMessageReceived, onShowConversation) => {
      this.connection.on("ReceiveMessage", (message) => {
        onMessageReceived(message);
      });

      this.connection.on("ShowConversation", (conversationMessages) => {
        onShowConversation(conversationMessages);
      });
    };

    this.conversationEvents = (onInitiatePrivateConversation) => {
      this.connection.on("InitiatePrivateConversation", (username) => {
        onInitiatePrivateConversation(username);
      })
    }
  }

  public OpenConversation = (groupName: string) => {
    this.connection
      .invoke("OpenConversation", groupName)
      .catch((err) => console.error(err));
    console.log(`Opened conversation: [${groupName}]`);
  };

  public SendMessage = (message: ISendMessage, groupName: string) => {
    this.connection
      .invoke("SendMessage", message, groupName)
      .catch((err) => console.error(err));
  };

  public InitiatePrivateConversation = (username: string) => {
    this.connection
      .invoke("InitiatePrivateConversation", username)
      .catch((err) => console.error(err));
    console.log(`Created convo with ${username}`);
  };

  public static getInstance(groupName: string): Connector {
    if (!Connector.instance) {
      Connector.instance = new Connector(groupName);
    }
    return Connector.instance;
  }
}
export default Connector;

import * as signalR from "@microsoft/signalr";

import { IConversation, IMessageGroup, ISendMessage } from "../ts/interfaces";

const URL = "http://localhost:5253/QuarkHub";
class Connector {
  private static instance: Connector | null = null;
  private connection: signalR.HubConnection;

  private connectionReady: boolean = false;
  private queuedActions: (() => void)[] = [];

  public chatEvents: (
    onMessageRecieved: (message: IMessageGroup) => void,
    onShowConversation: (conversationMessages: IMessageGroup[]) => void
  ) => void;
  public conversationEvents: (
    onInitiatePrivateConversation: (conversation: IConversation) => void
  ) => void;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(URL)
      .withAutomaticReconnect()
      .build();

    this.StartConnection();

    this.chatEvents = (onMessageReceived, onShowConversation) => {
      this.connection.on("ReceiveMessage", (message) => {
        onMessageReceived(message);
      });

      this.connection.on("ShowConversation", (conversationMessages) => {
        onShowConversation(conversationMessages);
      });
    };

    this.conversationEvents = (onInitiatePrivateConversation) => {
      this.connection.on("InitiatePrivateConversation", (conversation) => {
        onInitiatePrivateConversation(conversation);
      });
    };
  }

  private StartConnection = () => {
    this.connection
      .start()
      .then(() => {
        console.log("Connection started successfully!");

        this.connectionReady = true;

        this.queuedActions.forEach((action) => action());
        this.queuedActions = [];
      })
      .catch((err) => console.error(err));
  };

  public OpenConversation = (groupName: string) => {
    const OpenConversationAction = () => {
      this.connection
        .invoke("OpenConversation", groupName)
        .catch((err) => console.error(err));
      console.log(`Opened conversation: [${groupName}]`);
    };

    if (this.connectionReady) {
      OpenConversationAction();
    } else {
      this.queuedActions.push(OpenConversationAction);
    }
  };

  public SendMessage = (message: ISendMessage, groupName: string) => {
    this.connection
      .invoke("SendMessage", message, groupName)
      .catch((err) => console.error(err));
  };

  public InitiatePrivateConversation = (
    username: string,
    loggedUsername: string
  ) => {
    this.connection
      .invoke("InitiatePrivateConversation", username, loggedUsername)
      .catch((err) => console.error(err));
    console.log(`Created convo with ${username}`);
  };

  public static getInstance(): Connector {
    if (!Connector.instance) {
      Connector.instance = new Connector();
    }
    return Connector.instance;
  }
}
export default Connector;

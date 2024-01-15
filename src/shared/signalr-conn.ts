import * as signalR from "@microsoft/signalr";

import { IMessageGroup } from "../ts/interfaces";

const URL = "http://localhost:5253/QuarkHub"; //or whatever your backend port is
class Connector {
  private connection: signalR.HubConnection;
  public events: (
    onMessageReceivedGroup: (message: IMessageGroup) => void
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
        this.JoinGroup(groupName);
      })
      .catch((err) => document.write(err));
    this.events = (onMessageReceivedGroup) => {
      this.connection.on("ReceiveMessageGroup", (message) => {
        onMessageReceivedGroup(message);
      });
    };
  }

  public JoinGroup = (groupName: string) => {
    this.connection
      .invoke("JoinGroup", groupName)
      .catch((err) => console.error(err));
    console.log("Joined group", groupName);
  };

  public PushToGroup = (groupName: string, message: IMessageGroup) => {
    this.connection
      .invoke("PushToGroup", groupName, message)
      .catch((err) => console.error(err));
  };

  public static getInstance(username: string): Connector {
    if (!Connector.instance) {
      Connector.instance = new Connector(username);
    }
    return Connector.instance;
  }
}
export default Connector;

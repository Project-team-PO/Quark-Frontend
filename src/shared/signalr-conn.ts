import * as signalR from "@microsoft/signalr";
const URL = "http://localhost:5253/QuarkHub"; //or whatever your backend port is
class Connector {
    private connection: signalR.HubConnection;
    public events: (onMessageReceived: (message: string) => void) => void;
    static instance: Connector;
    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(URL)
            .withAutomaticReconnect()
            .build();
        this.connection.start().catch(err => document.write(err));
        this.events = (onMessageReceived) => {
            this.connection.on("ReceiveMessage", (message) => {
                onMessageReceived(message);
            });
        };
    }

    public PushMessage = (message: string) => {
        this.connection.send("PushMessage", message).then(_x => console.log(message))
    }

    public static getInstance(): Connector {
        if (!Connector.instance)
            Connector.instance = new Connector();
        return Connector.instance;
    }
}
export default Connector.getInstance;
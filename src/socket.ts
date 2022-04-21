import {WebSocket,WebSocketServer} from "ws";

export enum SocketType {
    CONNECTION = 'connection',
    MESSAGE = 'message'
}

export interface ChatData {
    username: string,
    message: string,
    date: string
}

export default function socket ({ wss } : { wss : WebSocketServer}) {
    console.log('socket')

    wss.on(SocketType.CONNECTION, (ws : WebSocket) => {
        console.log('is nice')
        ws.on(SocketType.MESSAGE, (message: string) => {
            console.log('message is: ', message)
            const data = JSON.parse(message) as ChatData;
            data.date = new Date().toISOString();
            ws.send(JSON.stringify(data));
        })
    })
}
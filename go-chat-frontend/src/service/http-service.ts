import axios from "axios";
import { Observable, from } from "rxjs";

export class HttpService {
  private static messageListeners: ((message: MessageEvent) => void)[] = [];
  private static socket: WebSocket | null = null;

  static get(url: string, params: any): Observable<any> {
    return from(axios.get(url, { params }));
  }

  static post(url: string, data: any): Observable<any> {
    return from(axios.post(url, data));
  }

  static isWebSocketConnected(): boolean {
    return this.socket != null;
  }

  static connectWebSocket(url: string): void {
    if (!this.socket) {
      this.socket = new WebSocket(url);

      this.socket.onopen = (event) => {
        console.log("WebSocket connection opened:", event);
      };

      this.socket.onmessage = (event) => {
        console.log("WebSocket message received:", event.data);
        this.messageListeners.forEach((listener) => listener(event));
      };

      this.socket.onclose = (event) => {
        console.log("WebSocket connection closed:", event);
        this.socket = null;
      };

      this.socket.onerror = (event) => {
        console.error("WebSocket error:", event);
        this.socket = null;
      };
    }
  }

  static disconnectWebSocket(): void {
    if (this.socket) {
      console.log("Disconnecting websocket");
      this.socket.close(1000);
      this.socket = null;
    }
  }

  static sendWebSocketMessage(message: string): void {
    if (this.socket) this.socket.send(message);
  }

  static onWebSocketMessage(listener: (message: MessageEvent) => void): void {
    this.messageListeners.push(listener);
  }
}

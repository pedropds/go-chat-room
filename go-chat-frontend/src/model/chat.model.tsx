export interface ChatRoomDTO {
    roomId: number;
    roomName: string;
    createdAt: string;
    creatorId: number;
}

export interface ChatMessageDTO {
    messageId?: number;
    roomId: number;
    userId?: number;
    username: string;
    content: string;
    createdAt?: string;
}
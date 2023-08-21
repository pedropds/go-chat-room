import React, { Component } from "react";
import { ChatMessageDTO } from "../model/chat.model";
import { FlatList, View, Text } from "react-native";


interface OpenChatState {
    chatMessages: ChatMessageDTO[];
}

export default class OpenChat extends Component<{}, OpenChatState> {

    constructor(props: any) {
        super(props);
        this.state = {
            chatMessages: []
        };
    }

    render() {
        return (
            <View>
                <FlatList data={this.state.chatMessages}
                    renderItem={({ item, index }) => (
                        <Text>{item.content}</Text>
                    )}
                />
            </View>
        );
    }

    componentDidMount(): void {
        const chatMessages: ChatMessageDTO[] = [
            { messageId: 1, roomId: 1, userId: 1, content: "Hello", createdAt: "2021-01-01" },
            { messageId: 2, roomId: 1, userId: 2, content: "Hi", createdAt: "2021-01-01" },
            { messageId: 3, roomId: 1, userId: 1, content: "How are you?", createdAt: "2021-01-01" },
            { messageId: 4, roomId: 1, userId: 2, content: "I'm fine, thanks", createdAt: "2021-01-01" },
            { messageId: 5, roomId: 1, userId: 1, content: "Good to hear", createdAt: "2021-01-01" },
            { messageId: 6, roomId: 1, userId: 2, content: "How about you?", createdAt: "2021-01-01" },
            { messageId: 7, roomId: 1, userId: 1, content: "I'm fine too", createdAt: "2021-01-01" },
            { messageId: 8, roomId: 1, userId: 2, content: "Good to hear", createdAt: "2021-01-01" },
            { messageId: 9, roomId: 1, userId: 1, content: "Bye", createdAt: "2021-01-01" },
            { messageId: 10, roomId: 1, userId: 2, content: "Bye", createdAt: "2021-01-01" },
        ];
        this.setState({ chatMessages });
    }
}

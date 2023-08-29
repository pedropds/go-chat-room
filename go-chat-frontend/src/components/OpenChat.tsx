import React, { Component } from "react";
import { ChatMessageDTO, ChatRoomDTO } from "../model/chat.model";
import { FlatList, View, Text, Animated, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { withNavigationFocus } from "react-navigation";
import { THEME_COLORS } from "../Constants";


interface OpenChatState {
    chatMessages: ChatMessageDTO[];
    chatRoom: ChatRoomDTO | null;
    fadeAnim: Animated.Value;
}

interface OpenChatProps {
    navigation: any;
    route: any;
}

export default class OpenChat extends Component<OpenChatProps, OpenChatState> {

    constructor(props: any) {
        super(props);
        this.state = {
            chatMessages: [],
            chatRoom: null,
            fadeAnim: new Animated.Value(-100)
        };
    }
    render() {
        const { fadeAnim } = this.state;
        return (
            <Animated.View style={[styles.container]}>
                <FlatList data={this.state.chatMessages}
                    renderItem={({ item, index }) => (
                        <View style={styles.messageBox}>
                            <Text style={styles.messageText}>{item.content}</Text>
                        </View>
                    )}
                />
            </Animated.View>
        );
    }

    componentDidMount(): void {
        const chatRoom: ChatRoomDTO = this.props.route.params.chatRoom;
        //TODO fetch real messages
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
        this.setState({ chatMessages, chatRoom });
    }

    componentDidUpdate(prevProps: any): void {
        const chatRoom: ChatRoomDTO = this.props.route.params.chatRoom;

        if (prevProps.route.params.chatRoom.roomId === chatRoom.roomId)
            return;

        //TODO fetch new messages
        console.log(this.props.route.params.chatRoom);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME_COLORS.CHAT_LIST_COLOR,
    },
    messageBox: {
        padding: 10,
        borderRadius: 20,
        borderColor: THEME_COLORS.INACTIVE_SCREEN_TAB,
        borderWidth: 1,
        marginBottom: 10,
        maxWidth: '80%',
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
        color: THEME_COLORS.ACTIVE_SCREEN_TAB,
    }
});


import React, { Component } from "react";
import { ChatMessageDTO, ChatRoomDTO } from "../../model/chat.model";
import { FlatList, View, Text, Animated, StyleSheet } from "react-native";
import { API_URL, THEME_COLORS, WS_URL } from "../../Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DefaultTheme, Menu, PaperProvider } from "react-native-paper";
import OpenChatHeader from "./OpenChatHeader";
import { HttpService } from "../../service/http-service";
import OpenChatSendMessage from "./OpenChatSendMessage";


interface OpenChatState {
    chatMessages: ChatMessageDTO[];
    chatRoom: ChatRoomDTO | null;
    username: string | null;
    visible: boolean;
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
            username: null,
            visible: false,
        };
        
    }

    _openMenu = () => this.setState({ visible: true });
    _closeMenu = () => this.setState({ visible: false });

    render() {
        return (
            <PaperProvider theme={DefaultTheme}>
                <View style={[styles.container]}>
                    <OpenChatHeader onBackButtonPress={this.handleBackButtonPress} chatRoom={this.state.chatRoom} navigation={this.props.navigation} />
                    <FlatList style={styles.list} data={this.state.chatMessages}
                        renderItem={({ item, index }) => {
                            const messageBoxStyle = item.username === this.state.username
                                ? styles.messageFromMe
                                : styles.messageFromOther;

                            return (
                                <View style={[messageBoxStyle]}>
                                    <Text style={styles.messageText}>{item.content}</Text>
                                </View>
                            );
                        }}
                    />
                    <OpenChatSendMessage onSend={this.handleSendMessage} />
                </View>
            </PaperProvider>
        );
    }

    async componentDidMount() {
        const chatRoom: ChatRoomDTO = this.props.route.params.chatRoom;

        const username = await AsyncStorage.getItem("loggedInUsername")
        this.setState({ chatRoom, username });

        this.loadChatMessages(chatRoom.roomId);
    }

    componentDidUpdate(prevProps: any): void {
        console.log("componentDidUpdate");
        const chatRoom: ChatRoomDTO = this.props.route.params.chatRoom;

        if (prevProps.route.params.chatRoom.roomId === chatRoom.roomId && HttpService.isWebSocketConnected())
            return;

        this.loadChatMessages(chatRoom.roomId);
    }

    private async loadChatMessages(chatRoomId: number) {
        const url = `${API_URL}/message/${chatRoomId}`;

        HttpService.get(url, {})
            .subscribe((response) => {
                const chatMessages = response.data;
                this.setState({ chatMessages });
            });

        HttpService.connectWebSocket(`${WS_URL}/chat-connect/${chatRoomId}`);

        this.listenToWebSocketEvents();
    }

    private listenToWebSocketEvents(): void {
        HttpService.onWebSocketMessage((message) => {
            const chatMessage = JSON.parse(message.data);
            this.setState((prevState) => ({
                chatMessages: [...prevState.chatMessages, chatMessage],
            }));
        });
    }
    
    private handleSendMessage = (text: string) => {
        const chatMessage: ChatMessageDTO = {
            content: text,
            username: this.state.username ?? "",
            roomId: this.state.chatRoom?.roomId ?? 0,
        };

        HttpService.sendWebSocketMessage(JSON.stringify(chatMessage));
    };

    private handleBackButtonPress = () => {
        HttpService.disconnectWebSocket();
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: THEME_COLORS.BACKGROUND_MENU_COLOR,
        backgroundColor: THEME_COLORS.CHAT_LIST_COLOR,
    },
    list: {
        paddingTop: 10,
    },
    messageFromMe: {
        padding: 10,
        borderRadius: 20,
        borderColor: THEME_COLORS.INACTIVE_SCREEN_TAB,
        borderWidth: 1,
        marginBottom: 10,
        maxWidth: '80%',
        alignSelf: 'flex-end',
    },
    messageFromOther: {
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


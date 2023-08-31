import React, { Component } from "react";
import { ChatMessageDTO, ChatRoomDTO } from "../model/chat.model";
import { FlatList, View, Text, Animated, StyleSheet } from "react-native";
import { API_URL, THEME_COLORS } from "../Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Appbar, DefaultTheme, Divider, Menu, PaperProvider } from "react-native-paper";


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
        const chatTitle = this.state.chatRoom?.roomName ?? "Chat";

        return (
            <PaperProvider theme={DefaultTheme}>
                <View style={[styles.container]}>
                    <Appbar.Header style={styles.topBar}>
                        <Appbar.Content titleStyle={styles.headerTitle} title={chatTitle} />
                        <Menu
                            visible={this.state.visible}
                            onDismiss={this._closeMenu}
                            anchor={
                                <Appbar.Action
                                    icon="dots-vertical"
                                    onPress={this._openMenu}
                                />
                            }
                        >
                            <Menu.Item onPress={() => { /* Handle option 1 */ }} title="Option 1" />
                            <Divider />
                            <Menu.Item onPress={() => { /* Handle option 2 */ }} title="Option 2" />
                        </Menu>
                    </Appbar.Header>
                    <FlatList data={this.state.chatMessages}
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
        const chatRoom: ChatRoomDTO = this.props.route.params.chatRoom;

        if (prevProps.route.params.chatRoom.roomId === chatRoom.roomId)
            return;

        this.loadChatMessages(chatRoom.roomId);
    }

    private async loadChatMessages(chatRoomId: number) {
        axios.get(`${API_URL}/message/${chatRoomId}`)
            .then((response) => {
                const chatMessages = response.data;
                this.setState({ chatMessages });
            });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: THEME_COLORS.BACKGROUND_MENU_COLOR,
        backgroundColor: THEME_COLORS.CHAT_LIST_COLOR,
    },
    topBar: {
        flexDirection: 'row',
        backgroundColor: THEME_COLORS.BACKGROUND_MENU_COLOR,
    },
    headerTitle: {
        color: THEME_COLORS.ACTIVE_SCREEN_TAB,
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


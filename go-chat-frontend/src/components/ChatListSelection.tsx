import React, { Component } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import LetterIcon from './icon/LettersIcon';
import { API_URL, THEME_COLORS } from '../Constants';
import { ChatRoomDTO } from '../model/chat.model';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { HttpService } from '../service/http-service';
import CreateNewChat from './open-chat/CreateNewChat';

interface ChatListProps {
    navigation: any;
}

interface ChatListState {
    chatList: ChatRoomDTO[];
    fadeAnim: Animated.Value;
}

export default class ChatList extends Component<ChatListProps, ChatListState> {

    constructor(props: any) {
        super(props);
        this.state = {
            chatList: [],
            fadeAnim: new Animated.Value(0)
        };
    }

    render() {
        const { fadeAnim } = this.state;

        const isChatListEmpty = this.state.chatList.length === 0;

        return (
            <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
                {isChatListEmpty ? (
                    <Text style={{ color: THEME_COLORS.INITIALS_ROOM_COLOR }}>No chats present</Text>
                ) : (
                    <FlatList style={styles.chatList} data={this.state.chatList}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                style={[
                                    styles.item,
                                    index === 0 && styles.firstItem,
                                ]}
                                onPress={() => this.handleItemPress(item)}
                            >
                                <LetterIcon initials={this.getInitials(item.roomName)} />
                                <Text style={styles.text}>{item.roomName}</Text>
                            </TouchableOpacity>
                        )}
                    />
                )}
                <View style={styles.createChat}>
                    <CreateNewChat />
                </View>
            </Animated.View>
        );
    }

    handleItemPress(item: ChatRoomDTO) {
        this.props.navigation.navigate('OpenChat', { chatRoom: item });
    }

    componentDidMount() {
        Animated.timing(this.state.fadeAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
        }).start();

        this.loadChatList();
    }

    getInitials(str: string): string {
        return str.substring(0, 2);
    }

    private async loadChatList() {
        const jwtToken = await AsyncStorage.getItem("token");

        if (jwtToken == null)
            return;

        const decodedToken: any = jwtDecode(jwtToken);
        const userId = decodedToken.userId;

        const url = `${API_URL}/chatroom/${userId}`;

        HttpService.get(url, {})
            .subscribe((response) => {
                const chatList = response.data;
                console.log(chatList);
                this.setState({ chatList });
            });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME_COLORS.CHAT_LIST_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    chatList: {
        flex: 1,
        width: '100%'
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
    },
    text: {
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'center',
        paddingLeft: 10,
        color: THEME_COLORS.INITIALS_ROOM_COLOR,
    },
    createChat: {
        marginLeft: 'auto',
    },
    firstItem: {
        borderTopWidth: 0,
    }
});


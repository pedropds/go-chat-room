import React, { Component } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import LetterIcon from './icon/LettersIcon';
import { THEME_COLORS } from '../Constants';
import { ChatRoomDTO } from '../model/chat.model';

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
        return (
            <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
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

        let chatList: ChatRoomDTO[] = [
            { roomId: 1, roomName: "Room 1", createdAt: "2021-01-01", creatorId: 1 },
            { roomId: 2, roomName: "Room 2", createdAt: "2021-01-01", creatorId: 1 },
            { roomId: 3, roomName: "Room 3", createdAt: "2021-01-01", creatorId: 1 },
            { roomId: 4, roomName: "Room 4", createdAt: "2021-01-01", creatorId: 1 },
            { roomId: 5, roomName: "Room 5", createdAt: "2021-01-01", creatorId: 1 },
            { roomId: 6, roomName: "Room 6", createdAt: "2021-01-01", creatorId: 1 },
            { roomId: 7, roomName: "Room 7", createdAt: "2021-01-01", creatorId: 1 },
            { roomId: 8, roomName: "Room 8", createdAt: "2021-01-01", creatorId: 1 },
            { roomId: 9, roomName: "Room 9", createdAt: "2021-01-01", creatorId: 1 },
            { roomId: 10, roomName: "Room 10", createdAt: "2021-01-01", creatorId: 1 },
            { roomId: 11, roomName: "Room 11", createdAt: "2021-01-01", creatorId: 1 },
            { roomId: 12, roomName: "Room 12", createdAt: "2021-01-01", creatorId: 1 },
            { roomId: 13, roomName: "Room 13", createdAt: "2021-01-01", creatorId: 1 },
        ];
        this.setState({ chatList });
        /*
        axios.get('http://localhost:8080/chatroom/1')
            .then((response) => {
                const chatList = response.data;
                console.log(chatList);
                this.setState({ chatList });
            });
            */
    }

    getInitials(str: string): string {
        return str.substring(0, 2);
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
    firstItem: {
        borderTopWidth: 0,
    }
});


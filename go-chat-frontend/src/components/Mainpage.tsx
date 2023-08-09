import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import ChatRoomDTO from '../model/chat.model';


interface ChatListState {
    chatList: ChatRoomDTO[]; 
}
  
export default class ChatList extends Component<{}, ChatListState> {

    constructor(props: any) {
        super(props);
        this.state = {
            chatList: []
        };
    }

    render() {
        return (
            <View>
                <Text>Chat List</Text>
                {this.state.chatList.map((chat: any) => (
                    <Text key={chat.roomId}>{chat.roomName}</Text>
                ))}
            </View>
        );
    }

    componentDidMount() {
        axios.get('http://localhost:8080/chatroom/1')
            .then((response) => {
                const chatList = response.data;
                console.log(chatList);
                this.setState({ chatList });
            });
    }
}

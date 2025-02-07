import React, { useEffect, useState, useCallback } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL, THEME_COLORS, WS_URL } from "../../Constants";
import { ChatMessageDTO, ChatRoomDTO } from "../../model/chat.model";
import OpenChatHeader from "./OpenChatHeader";
import OpenChatSendMessage from "./OpenChatSendMessage";
import { HttpService } from "../../service/http-service";

interface OpenChatProps {
  navigation: any;
  route: any;
}

const OpenChat = ({ navigation, route }: OpenChatProps) => {
  const [chatMessages, setChatMessages] = useState<ChatMessageDTO[]>([]);
  const [chatRoom, setChatRoom] = useState<ChatRoomDTO | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const loadChatMessages = useCallback(async (chatRoomId: number) => {
    const url = `${API_URL}/message/${chatRoomId}`;

    HttpService.get(url, {}).subscribe((response: { data: any }) => {
      const messages = response.data;
      setChatMessages(messages);
    });

    HttpService.connectWebSocket(`${WS_URL}/chat-connect/${chatRoomId}`);

    HttpService.onWebSocketMessage((message: any) => {
      const chatMessage = JSON.parse(message.data);
      setChatMessages((prevMessages) => [...prevMessages, chatMessage]);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const room: ChatRoomDTO = route.params.chatRoom;
      const user = await AsyncStorage.getItem("loggedInUsername");

      setChatRoom(room);
      setUsername(user);
      loadChatMessages(room.roomId);
    });

    // Cleanup the listener when the screen is unfocused
    return () => {
      unsubscribe();
      HttpService.disconnectWebSocket();
    };
  }, [navigation, route.params.chatRoom, loadChatMessages]);

  const handleSendMessage = useCallback(
    (text: string) => {
      if (!chatRoom || !username) return;

      const chatMessage: ChatMessageDTO = {
        content: text,
        username,
        roomId: chatRoom.roomId,
      };

      HttpService.sendWebSocketMessage(JSON.stringify(chatMessage));
    },
    [chatRoom, username]
  );

  const handleBackButtonPress = useCallback(() => {
    HttpService.disconnectWebSocket();
    navigation.goBack();
  }, [navigation]);

  return (
    <PaperProvider theme={DefaultTheme}>
      <View style={[styles.container]}>
        <OpenChatHeader
          onBackButtonPress={handleBackButtonPress}
          chatRoom={chatRoom}
          navigation={navigation}
        />
        <FlatList
          style={styles.list}
          data={chatMessages}
          keyExtractor={(item, index) => `${item.roomId}-${index}`}
          renderItem={({ item, index }) => {
            const isMessageFromMe = item.username === username;
            const isFirstMessageFromUser =
              index === 0 || chatMessages[index - 1].username !== item.username;

            const messageBoxStyle = isMessageFromMe
              ? styles.messageFromMe
              : styles.messageFromOther;

            return (
              <View>
                {!isMessageFromMe && isFirstMessageFromUser && (
                  <Text style={styles.usernameText}>{item.username}</Text>
                )}
                <View style={[messageBoxStyle]}>
                  <Text style={styles.messageText}>{item.content}</Text>
                </View>
              </View>
            );
          }}
        />

        <OpenChatSendMessage onSend={handleSendMessage} />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: THEME_COLORS.BACKGROUND_MENU_COLOR,
    backgroundColor: THEME_COLORS.CHAT_LIST_COLOR,
  },
  list: {
    paddingTop: 10,
    paddingRight: 15,
    paddingLeft: 15,
  },
  messageFromMe: {
    padding: 10,
    borderRadius: 20,
    borderColor: THEME_COLORS.INACTIVE_SCREEN_TAB,
    borderWidth: 1,
    marginBottom: 10,
    maxWidth: "80%",
    alignSelf: "flex-end",
    backgroundColor: "green",
  },
  messageFromOther: {
    padding: 10,
    borderRadius: 20,
    borderColor: THEME_COLORS.INACTIVE_SCREEN_TAB,
    borderWidth: 1,
    marginBottom: 10,
    maxWidth: "80%",
    alignSelf: "flex-start",
    backgroundColor: "#4A90E2",
  },
  messageText: {
    fontSize: 16,
    color: THEME_COLORS.ACTIVE_SCREEN_TAB,
  },
  usernameText: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: THEME_COLORS.ACTIVE_SCREEN_TAB,
    alignSelf: "flex-start",
    paddingLeft: 8,
  },
});

export default OpenChat;

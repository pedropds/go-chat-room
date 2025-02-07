import React, { useEffect, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import LetterIcon from "./icon/LettersIcon";
import { API_URL, THEME_COLORS } from "../Constants";
import { ChatRoomDTO } from "../model/chat.model";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { HttpService } from "../service/http-service";
import CreateNewChat from "./open-chat/CreateNewChat";

interface ChatListProps {
  navigation: any;
}

const ChatList = ({ navigation }: ChatListProps) => {
  const [chatList, setChatList] = useState<ChatRoomDTO[]>([]);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();

    loadChatList();
  }, []);

  const loadChatList = async () => {
    const jwtToken = await AsyncStorage.getItem("token");

    if (!jwtToken) return;

    const decodedToken: any = jwtDecode(jwtToken);
    const userId = decodedToken.userId;

    const url = `${API_URL}/chatroom/${userId}`;

    HttpService.get(url, {}).subscribe((response) => {
      const chatList = response.data;
      console.log(chatList);
      setChatList(chatList);
    });
  };

  const getInitials = (str: string): string => str.substring(0, 2);

  const handleItemPress = (item: ChatRoomDTO) => {
    navigation.navigate("OpenChat", { chatRoom: item });
  };

  const isChatListEmpty = chatList.length === 0;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {isChatListEmpty ? (
        <Text style={{ color: THEME_COLORS.INITIALS_ROOM_COLOR }}>
          No chats present
        </Text>
      ) : (
        <FlatList
          style={styles.chatList}
          data={chatList}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[styles.item, index === 0 && styles.firstItem]}
              onPress={() => handleItemPress(item)}
            >
              <LetterIcon initials={getInitials(item.roomName)} />
              <Text style={styles.text}>{item.roomName}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <View style={styles.createChat}>
        <CreateNewChat setChatList={setChatList} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.CHAT_LIST_COLOR,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  chatList: {
    flex: 1,
    width: "100%",
  },
  item: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
  },
  text: {
    display: "flex",
    flexWrap: "wrap",
    alignContent: "center",
    paddingLeft: 10,
    color: THEME_COLORS.INITIALS_ROOM_COLOR,
  },
  createChat: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  firstItem: {
    borderTopWidth: 0,
  },
});

export default ChatList;

import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ReusableChatModal from "./ReusableChatModal";
import { HttpService } from "../../service/http-service";
import { API_URL } from "../../Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Member {
  id: number;
  label: string;
  value: string;
}

const CreateNewChat = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const friends: Member[] = [
    { id: 1, label: "Alice", value: "Alice" },
    { id: 2, label: "Bob", value: "Bob" },
    { id: 3, label: "Charlie", value: "Charlie" },
    { id: 4, label: "Diana", value: "Diana" },
    { id: 5, label: "Eve", value: "Eve" },
  ];

  const handleCreateChat = async (data: {
    chatName?: string;
    members: Member[];
  }) => {
    const url = `${API_URL}/chatroom`;

    const creatorId = Number(await AsyncStorage.getItem("userId"));
    const memberIds = data.members.map((m) => m.id);

    const postData = {
      roomName: data.chatName,
      creatorId: creatorId,
      members: memberIds,
    };

    console.log(postData);
    HttpService.post(url, postData).subscribe((result) => console.log(result));
  };

  return (
    <View style={styles.button}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsModalOpen(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <ReusableChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateChat}
        title="Create New Chat"
        friends={friends}
        allowChatName={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  addButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2196F3",
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  addButtonText: {
    fontSize: 24,
    color: "#fff",
  },
});

export default CreateNewChat;

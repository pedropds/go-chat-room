import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ReusableChatModal from "./ReusableChatModal";
import { HttpService } from "../../service/http-service";
import { API_URL } from "../../Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Member {
  userId: number;
  username: string;
  email: string;
}

const CreateNewChat = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const creatorId = Number(await AsyncStorage.getItem("userId"));
        const url = `${API_URL}/user/friends/${creatorId}`;

        HttpService.get(url, {}).subscribe((friends) =>
          setFriends(friends.data)
        );
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, []);

  const handleCreateChat = async (data: {
    chatName?: string;
    members: Member[];
  }) => {
    const url = `${API_URL}/chatroom`;

    const creatorId = Number(await AsyncStorage.getItem("userId"));
    const memberIds = data.members.map((m) => m.userId);

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

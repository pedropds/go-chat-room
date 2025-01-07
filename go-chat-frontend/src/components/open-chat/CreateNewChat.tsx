import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ReusableChatModal from "./ReusableChatModal";

const CreateNewChat = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const friends = [
    { label: "Alice", value: "Alice" },
    { label: "Bob", value: "Bob" },
    { label: "Charlie", value: "Charlie" },
    { label: "Diana", value: "Diana" },
    { label: "Eve", value: "Eve" },
  ];

  const handleCreateChat = (data: { chatName?: string; members: string[] }) => {
    console.log("New Chat Created:", data);
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

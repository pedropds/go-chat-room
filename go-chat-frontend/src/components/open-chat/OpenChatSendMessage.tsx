import React, { useState, useCallback } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { THEME_COLORS } from "../../Constants";

interface OpenChatSendMessageProps {
  onSend: (text: string) => void;
}

const OpenChatSendMessage = ({ onSend }: OpenChatSendMessageProps) => {
  const [text, setText] = useState("");

  const handleTextChange = useCallback((newText: string) => {
    setText(newText);
  }, []);

  const handleSendButtonPress = useCallback(() => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  }, [text, onSend]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type a message"
        value={text}
        onChangeText={handleTextChange}
      />
      <IconButton
        style={{ backgroundColor: THEME_COLORS.ACTIVE_SCREEN_TAB }}
        icon="send"
        onPress={handleSendButtonPress}
        disabled={!text.trim()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME_COLORS.BACKGROUND_MENU_COLOR,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ccc",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    marginRight: 8,
  },
});

export default OpenChatSendMessage;

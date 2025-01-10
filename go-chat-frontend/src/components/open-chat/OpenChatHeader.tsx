import React, { useState, useCallback } from "react";
import { StyleSheet } from "react-native";
import { Appbar, Menu } from "react-native-paper";
import { ChatRoomDTO } from "../../model/chat.model";
import { THEME_COLORS } from "../../Constants";
import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

interface OpenChatHeaderProps {
  navigation: any;
  chatRoom: ChatRoomDTO | null;
  onBackButtonPress: () => void;
}

const OpenChatHeader = ({
  navigation,
  chatRoom,
  onBackButtonPress,
}: OpenChatHeaderProps) => {
  const [visible, setVisible] = useState(false);

  const openMenu = useCallback(() => setVisible(true), []);
  const closeMenu = useCallback(() => setVisible(false), []);

  const handleViewMembersOption = useCallback(() => {
    console.log("View members");
  }, []);

  const handleBackButtonPress = useCallback(() => {
    onBackButtonPress();
    navigation.goBack();
  }, [onBackButtonPress, navigation]);

  const chatTitle = chatRoom?.roomName ?? "Chat";

  return (
    <Appbar.Header style={styles.topBar}>
      <Appbar.BackAction onPress={handleBackButtonPress} color="white" />
      <Appbar.Content titleStyle={styles.headerTitle} title={chatTitle} />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Appbar.Action
            icon="dots-vertical"
            onPress={openMenu}
            color="white"
          />
        }
      >
        <Menu.Item onPress={handleViewMembersOption} title="View members" />
      </Menu>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    backgroundColor: THEME_COLORS.BACKGROUND_MENU_COLOR,
  },
  headerTitle: {
    color: THEME_COLORS.ACTIVE_SCREEN_TAB,
  },
  menu: {
    color: "white",
  },
});

export default OpenChatHeader;

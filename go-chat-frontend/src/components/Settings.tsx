import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { THEME_COLORS } from "../Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SettingsProps {
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onLogout }) => {
  const options = [{ id: -1, name: "Logout" }];

  const handleItemPress = async (item: any) => {
    switch (item.id) {
      case -1:
        await handleLogout();
        break;
      default:
        break;
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    await AsyncStorage.removeItem("username");
    await AsyncStorage.removeItem("token");

    onLogout();
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.optionList}
        data={options}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[styles.item, index === 0 && styles.firstItem]}
            onPress={() => handleItemPress(item)}
          >
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
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
  optionList: {
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
  firstItem: {
    borderTopWidth: 0,
  },
});

export default Settings;

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import ChatList from "./ChatListSelection";
import SettingsComp from "./Settings";
import { THEME_COLORS } from "../Constants";
import OpenChat from "./open-chat/OpenChat";

const Tab = createBottomTabNavigator();

interface MainContainerProps {
  onLogout: () => void;
}

const MainContainer: React.FC<MainContainerProps> = ({ onLogout }) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Chats"
        screenOptions={({ route }) => ({
          animationEnabled: true,
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            const iconName =
              route.name === "Chats" ? "ios-chatbubbles" : "settings-outline";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: THEME_COLORS.ACTIVE_SCREEN_TAB,
          tabBarInactiveTintColor: THEME_COLORS.INACTIVE_SCREEN_TAB,
          tabBarStyle: {
            height: 75,
            borderBottomWidth: 0,
            borderTopWidth: 0,
            backgroundColor: THEME_COLORS.BACKGROUND_MENU_COLOR,
            paddingBottom: 10,
          },
        })}
      >
        <Tab.Screen name="Chats" component={ChatList} />
        <Tab.Screen name="Settings">
          {(props) => <SettingsComp {...props} onLogout={onLogout} />}
        </Tab.Screen>
        <Tab.Screen
          name="OpenChat"
          component={OpenChat}
          options={{
            tabBarButton: () => null,
            tabBarStyle: { display: "none" },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainContainer;

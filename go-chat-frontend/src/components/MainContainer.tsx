import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import React from "react";
import { Ionicons } from '@expo/vector-icons';


import ChatList from "./ChatMain";
import SettingsComp from "./Settings";
import { THEME_COLORS } from "../Constants";


const Tab = createBottomTabNavigator();

export default class MainContainer extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator initialRouteName="Chats"
                    screenOptions={({ route }) => ({
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName: any = "";
                            let rn = route.name;
                            iconName = rn === 'Chats' ? 'ios-chatbubbles' : 'settings-outline';

                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: THEME_COLORS.ACTIVE_SCREEN_TAB,
                        tabBarInactiveTintColor: THEME_COLORS.INACTIVE_SCREEN_TAB,
                        tabBarStyle: {
                            borderBottomWidth: 0,
                            borderTopWidth: 0,
                            backgroundColor: THEME_COLORS.BACKGROUND_MENU_COLOR,
                        },
                    })}>
                    <Tab.Screen name="Chats" component={ChatList} />
                    <Tab.Screen name="Settings" component={SettingsComp} />
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}
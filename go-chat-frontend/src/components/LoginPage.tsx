import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, THEME_COLORS } from '../Constants';
import axios from 'axios';

interface LoginScreenProps {
    onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post(API_URL + "/user/login", {
                username,
                password,
            });

            const usernameResponse = response.data.username;
            const token = response.data.token;

            await AsyncStorage.setItem("loggedInUsername", usernameResponse);
            await AsyncStorage.setItem("token", token);
            await AsyncStorage.setItem("isLoggedIn", "true");
            
            onLogin();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Go Chat - Beta</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        backgroundColor: THEME_COLORS.CHAT_LIST_COLOR,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '40%',
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    loginButton: {
        padding: 10,
        width: '20%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: THEME_COLORS.INACTIVE_SCREEN_TAB,
    },
    buttonText: {
        display: 'flex',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 18,
    },
});

export default LoginScreen;

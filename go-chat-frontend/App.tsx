import { StyleSheet, View, Text } from 'react-native';
import MainContainer from './src/components/MainContainer';
import React, { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import LoginScreen from './src/components/LoginPage';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const storedValue = await AsyncStorage.getItem('isLoggedIn');
        if (storedValue === 'true') {
          setIsLoggedIn(true);
        }

        setLoading(false);
      } catch (error) {
        // Handle error
      }
    };
    checkAuthentication();
  }, []);

  if (loading) {
    return <Text></Text>
  }

  return (
    <ChakraProvider>
      <View style={{ flex: 1 }}>
        {isLoggedIn ? (
          <MainContainer onLogout={handleLogout} />
        ) : (
          <LoginScreen onLogin={handleLogin} />
        )}
      </View>
    </ChakraProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

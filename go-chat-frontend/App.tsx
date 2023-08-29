import { StyleSheet, View, Text } from 'react-native';
import MainContainer from './src/components/MainContainer';
import { useEffect, useState } from 'react';
import LoginScreen from './src/components/LoginPage';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const storedValue = await AsyncStorage.getItem('isLoggedIn');
        if (storedValue === 'true') {
          setIsLoggedIn(false);
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
    <View style={{ flex: 1 }}>
      {isLoggedIn ? (
        <MainContainer />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </View>
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

import { StyleSheet } from 'react-native';
import MainContainer from './src/components/MainContainer';


export default function App() {
  return (
     <MainContainer/>
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

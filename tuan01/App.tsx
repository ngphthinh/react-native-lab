import { SafeAreaProvider } from 'react-native-safe-area-context';
import SmartCampusScreen from './src/components/SmartCampusScreen';

export default function App() {
  return <SafeAreaProvider>
    <SmartCampusScreen />
  </SafeAreaProvider>;
}
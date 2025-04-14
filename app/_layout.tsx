
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import AuthListener from './RootLayout';


export default function RootLayoutNav() {
  
  return (
    <>
      <AuthListener />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="index_routes" options={{ headerShown: false }} />
        <Stack.Screen name='screens/SOSScreen' options={{ headerShown: true }} />
        <Stack.Screen name= "screens/CheckInScreen" options={{ headerShown: true }} />
        <Stack.Screen name="screens/ContactsScreen" options={{ headerShown: true }} />
        <Stack.Screen name="screens/TipsScreen" options={{ headerShown: true }} />
        <Stack.Screen name="screens/HistoryScreen" options={{ headerShown: true }} />
        <Stack.Screen name="screens/RealTimeLocationScreen" options={{ headerShown: true }} />
        <Stack.Screen name="screens/Login" options={{ headerShown: false }} />
        <Stack.Screen name="Logout" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}


import { Stack } from 'expo-router';
import 'react-native-reanimated';


  /**
   * RootLayoutNav is a navigation component that provides a basic layout for
   * the app. It uses the Stack navigator to define the different screens.
   * 
   * The screens are defined as follows:
   * - "index": The home screen of the app, which is not shown in the header.
   * - "Home": The home screen of the app, which is not shown in the header.
   * - "screens/SOSScreen": The SOS screen, which is shown in the header.
   * - "screens/CheckInScreen": The check-in screen, which is shown in the header.
   * - "screens/ContactsScreen": The contacts screen, which is shown in the header.
   * - "screens/TipsScreen": The tips screen, which is shown in the header.
   * - "screens/HistoryScreen": The history screen, which is shown in the header.
   * - "screens/RealTimeLocationScreen": The real-time location screen, which is shown in the header.
   * - "screens/Login": The login screen, which is not shown in the header.
   * - "Logout": The logout screen, which is not shown in the header.
   * 
   * The header is only shown for the screens that have a header.
   */
export default function RootLayoutNav() {
  
  return (
    
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="Home" options={{ headerShown: false }} />
        <Stack.Screen name='screens/SOSScreen' options={{ headerShown: true }} />
        <Stack.Screen name= "screens/CheckInScreen" options={{ headerShown: true }} />
        <Stack.Screen name="screens/ContactsScreen" options={{ headerShown: true }} />
        <Stack.Screen name="screens/TipsScreen" options={{ headerShown: true }} />
        <Stack.Screen name="screens/HistoryScreen" options={{ headerShown: true }} />
        <Stack.Screen name="screens/RealTimeLocationScreen" options={{ headerShown: true }} />
        <Stack.Screen name="screens/Login" options={{ headerShown: false }} />
        <Stack.Screen name="Logout" options={{ headerShown: false }} />
      </Stack>
    
  );
}

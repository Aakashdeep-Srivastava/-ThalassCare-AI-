import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PatientProvider } from '@/context/PatientContext';
import { AuthProvider } from '@/context/AuthContext';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <AuthProvider>
      <PatientProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="splash"
            options={{
              animation: 'fade',
            }}
          />
          <Stack.Screen
            name="login"
            options={{
              animation: 'slide_from_right',
              gestureEnabled: false,
            }}
          />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="games"
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="light" />
      </PatientProvider>
    </AuthProvider>
  );
}

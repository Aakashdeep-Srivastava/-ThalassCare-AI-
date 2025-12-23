import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PatientProvider } from '@/context/PatientContext';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <PatientProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </PatientProvider>
  );
}

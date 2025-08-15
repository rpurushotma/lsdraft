import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="beat-timer" />
        <Stack.Screen name="countdown" />
        <Stack.Screen name="guide" />
        <Stack.Screen name="language" />
        <Stack.Screen name="task-timer" />
        <Stack.Screen name="success" />
        <Stack.Screen name="failure" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
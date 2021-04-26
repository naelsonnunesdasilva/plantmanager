import React, { useEffect } from 'react';
import Routes from './src/routes';
import AppLoading from 'expo-app-loading';
import * as Notification from 'expo-notifications';
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';
import { PlantProps } from './src/libs/storage';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  // useEffect(() => {
  //   const subscription = Notification.addNotificationReceivedListener(
  //     async notification => {
  //       const data = notification.request.content.data.plant as PlantProps;
  //       console.log(data);
  //     }
  //   );

  //   return () => subscription.remove();
  // }, []);

  // async function notifications(){
  //   const data = await Notification.getAllScheduledNotificationsAsync();
  //   console.log(data);

  //   Notification.cancelAllScheduledNotificationsAsync();
  // }

  // notifications();

  if (!fontsLoaded)
    return <AppLoading />

  return (
    <Routes />
  )
}
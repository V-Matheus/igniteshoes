import { StatusBar, Platform } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';
import { NotificationClickEvent, OneSignal } from 'react-native-onesignal';
import { tagUserInfoCreate } from './src/notifications/notificationsTags';
import { act, useEffect } from 'react';

const oneSignalAppId =
  Platform.OS === 'ios' ? 'iosID' : 'ecedc784-f334-42fb-9be5-b5afc94af3e9';

OneSignal.initialize(oneSignalAppId);
OneSignal.Notifications.requestPermission(true);

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate();

  useEffect(() => {
    console.log('App mounted');
    
    const handleNotificationClick = (event: NotificationClickEvent) => {
      const { actionId } = event.result;

      switch (actionId) {
        case '1':
          console.log('Ver todos');
          break;

        case '2':
          console.log('Ver Pedido');
          break;
        default:
          console.log('Nenhum botão pressionado');
          break;
      }
    };

    OneSignal.Notifications.addEventListener('click', handleNotificationClick);

    return () =>
      OneSignal.Notifications.removeEventListener(
        'click',
        handleNotificationClick,
      );
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}

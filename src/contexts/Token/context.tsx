/* eslint-disable react/jsx-no-constructed-context-values */

import {} from '../../dtos';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { ReactNode, createContext, useEffect } from 'react';
import { Platform } from 'react-native';

type TMessage = {
  token: string;
  title: string;
  text: string;
};

interface ICreateContextData {
  mytoken: string;
  sendMessage(data: TMessage): Promise<void>;
}

type TCreation = {
  children: ReactNode;
};

export const TokenContexProvider = createContext({} as ICreateContextData);

export function TokenContext({ children }: TCreation) {
  const [mytoken, setMytoken] = React.useState('');

  const token = React.useCallback(async () => {
    let token = '';

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      console.log('toke');
    }

    setMytoken(token);
  }, []);

  React.useEffect(() => {
    token();
  }, []);

  const sendMessage = React.useCallback(async (data: TMessage) => {
    const message = {
      to: data.token,
      sound: 'default',
      title: data.title,
      body: data.text,
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }, []);

  return (
    <TokenContexProvider.Provider value={{ mytoken, sendMessage }}>
      {children}
    </TokenContexProvider.Provider>
  );
}

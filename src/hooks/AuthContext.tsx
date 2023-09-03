/* eslint-disable react/jsx-no-constructed-context-values */
// /* eslint-disable react/jsx-no-constructed-context-values */
// /* eslint-disable consistent-return */
// /* eslint-disable react/prop-types */
// /* eslint-disable camelcase */
// import { STORAGE_KEY, STORAGE_KEY_TOKEN } from '@types';
import React, { ReactNode, createContext, useCallback, useState } from 'react';
import { Alert } from 'react-native';

// import * as LocalAuthentication from 'expo-local-authentication';

import { useToast } from 'native-base';

import { IProvider } from '@/dtos';
import { api } from '@/services/api';
import { AppError } from '@/services/AppError';
import { routesScheme } from '@/services/schemeRoutes';
import { TokenStorage } from '@/services/storage/token-storage';

interface ILogin {
  email: string;
  password: string;
}

interface IAuthContextData {
  provider: IProvider;
  login(credential: ILogin): Promise<void>;
  loading: boolean;
  logOut(): Promise<void>;
  updateUser(user: any): Promise<void>;
}

type TAuthContext = {
  children: ReactNode;
};

type AuthState = {
  token: string;
  provider: IProvider;
};

export const AuthContext = createContext<IAuthContextData>(
  {} as IAuthContextData,
);

const storageToken = new TokenStorage();

export function AuthContextProvider({ children }: TAuthContext) {
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const [data, setData] = useState<AuthState>({} as AuthState);

  const userAndTokenUpdate = React.useCallback(async (token: string) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    await api.get('/user/find-user-by-id').then(async h => {
      const user = h.data;
      setData({ token, user });
    });
  }, []);

  const LoadingUser = useCallback(async () => {
    setLoading(true);

    const token = await storageToken.getToken();

    if (token) {
      userAndTokenUpdate(token);
    }

    setLoading(false);
  }, [userAndTokenUpdate]);

  React.useEffect(() => {
    LoadingUser();
  }, []);

  const login = useCallback(async ({ email, password }: ILogin) => {
    try {
      await api
        .post('/provider-session', {
          email,
          password,
        })
        .then(async h => {
          const { token, provider } = h.data;
          api.defaults.headers.common.Authorization = `Bearer ${token}`;

          await api.get(`/provider/${provider.id}`).then(async h => {
            const provider = h.data;
            setData({ token, provider });

            await storageToken.setToken(token);
          });
        });
    } catch (error) {
      const isError = error instanceof AppError;
      const title = isError
        ? error.message
        : 'Não foi possível entrar na sua conta, tente novamente mais tarde';

      if (isError) {
        toast.show({
          title: 'Algo deu erroado',
          description: title,
          placement: 'bottom',
          bgColor: 'red.500',
        });
      } else {
        toast.show({
          title,
          description:
            'Estamos com um problema no servidor, tente novamente mais tarde',
          placement: 'bottom',
          bgColor: 'red.500',
        });
      }
    }
  }, []);

  const logOut = useCallback(async () => {
    await storageToken.removeToken();
    setData({} as AuthState);
  }, [data]);

  const updateUser = useCallback(
    async (provider: any) => {
      const dados = {
        token: data.token,
        provider,
      };

      setData(dados);
    },
    [data.token],
  );

  const tokkenFail = React.useCallback(async () => {
    logOut();
    toast.show({
      title: 'Seu token expirou.',
      description: 'Entre novamente com suas credenciais',
      placement: 'bottom',
      bg: 'red.500',
    });
  }, [logOut, toast]);

  React.useEffect(() => {
    const out = api.registerIntercepTokenManager(tokkenFail);

    return () => {
      out();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ provider: data.provider, login, logOut, loading, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

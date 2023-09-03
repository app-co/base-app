/* eslint-disable class-methods-use-this */
import AsyncStorage from '@react-native-async-storage/async-storage';

const key = '@appGeb:auth-data';

interface I {
  membro: string;
  senha: string;
}

export class LocalAuthData {
  async setStorage({ membro, senha }: I): Promise<void> {
    const stringData = JSON.stringify({ membro, senha });
    await AsyncStorage.setItem(key, stringData);
  }

  async getStorage() {
    const get = await AsyncStorage.getItem(key);

    const storage = get ? JSON.parse(get) : null;

    return storage;
  }

  async removeToken() {
    await AsyncStorage.removeItem(key);
  }
}

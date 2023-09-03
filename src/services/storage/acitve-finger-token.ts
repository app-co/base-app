/* eslint-disable class-methods-use-this */
import AsyncStorage from '@react-native-async-storage/async-storage';

const key = '@appGeb:isAvitiveFingerprint';

interface I {
  isActive: boolean;
}

export class IsActiveFingerTokenStorage {
  async setStorage(data: I): Promise<void> {
    const stringData = JSON.stringify(data);
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

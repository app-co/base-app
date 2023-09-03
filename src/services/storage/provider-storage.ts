/* eslint-disable class-methods-use-this */
import AsyncStorage from '@react-native-async-storage/async-storage';

const key = '@appcomagenda:provider';

export class ProviderStorage {
  async setToken(user: any): Promise<void> {
    const data = JSON.stringify(user);
    await AsyncStorage.setItem(key, data);
  }

  async getToken() {
    const getStorageToken = await AsyncStorage.getItem(key);

    const token = getStorageToken || null;

    return token;
  }

  async removeToken() {
    await AsyncStorage.removeItem(key);
  }
}

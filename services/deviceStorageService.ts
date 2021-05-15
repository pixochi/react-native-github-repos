import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (
  storageKey: string,
  value: Parameters<typeof JSON.stringify>[0],
) => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(storageKey, jsonValue);
};

export const getData = async (storageKey: string) => {
  const jsonValue = await AsyncStorage.getItem(storageKey);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};

export const removeData = async (storageKey: string) => {
  await AsyncStorage.removeItem(storageKey);
};

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Entry {
  imageUri: string;
  address: string;
}

export const storeData = async (data: Entry[]): Promise<void> => {
  try {
    await AsyncStorage.setItem('@entries', JSON.stringify(data));
  } catch (e) {
    console.error('Error storing data:', e);
  }
};

export const getData = async (): Promise<Entry[]> => {
  try {
    const data = await AsyncStorage.getItem('@entries');
    return data != null ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error retrieving data:', e);
    return [];
  }
};
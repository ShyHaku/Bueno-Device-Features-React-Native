import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  Image,
  Text,
  Platform,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';

import { storeData, getData, Entry } from '../utils/storage';
import { useTheme } from '../context/ThemeContext';
import AddEntryStyle from '../styles/EntryStyle';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const AddEntryScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [locationLoading, setLocationLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const { theme } = useTheme();

  useEffect(() => {
    requestPermissions();
    registerForPushNotificationsAsync();
  }, []);

  const requestPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied.');
    }
  };
  const textColor = theme === 'dark' ? '#fff' : '#333';
  const registerForPushNotificationsAsync = async () => {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (!Device.isDevice) {
      alert('Must use physical device for push notifications');
      return;
    }

    const { granted } = await Notifications.getPermissionsAsync();
    if (!granted) {
      const { granted: requested } = await Notifications.requestPermissionsAsync();
      if (!requested) {
        alert('Permission for notifications not granted.');
        return;
      }
    }

    const token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      })
    ).data;
  };

  const sendPushNotification = async (body: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Travel Journal',
        body: body,
        sound: 'default',
      },
      trigger: null,
    });
  };

  const getCurrentLocation = async () => {
    setLocationLoading(true);
    try {
      const locationData = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(locationData);
      await getAddress(
        locationData.coords.latitude,
        locationData.coords.longitude
      );
    } catch (error) {
      setErrorMsg('Error fetching location.');
    } finally {
      setLocationLoading(false);
    }
  };

  const getAddress = async (latitude: number, longitude: number) => {
    try {
      const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (geocode.length > 0) {
        const place = geocode[0];
        const formattedAddress = `${place.name ?? ''}, ${place.street ?? ''}, ${place.city ?? ''}, ${place.region ?? ''}, ${place.country ?? ''}`;
        setAddress(formattedAddress);
      } else {
        setAddress('Address not found');
      }
    } catch (error) {
      setAddress('Unable to fetch address');
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      await getCurrentLocation();
    }
  };

  const saveEntry = async () => {
    if (imageUri && address) {
      const newEntry: Entry = { imageUri, address };
      const existingEntries = await getData();
      existingEntries.push(newEntry);
      await storeData(existingEntries);

      await sendPushNotification(`Entry saved with address: ${address}`);
      navigation.goBack();
    } else {
      await sendPushNotification('Please take a photo and wait for the address.');
    }
  };

  const cancelEntry = () => {
    setImageUri(null);
    setLocation(null);
    setAddress('');
    navigation.goBack();
  };

  

  return (
    <View style={AddEntryStyle.container}>
      <Button title="Take Photo" onPress={takePhoto} />
      {imageUri && (
        <>
          <Image source={{ uri: imageUri }} style={AddEntryStyle.image} />
          {!locationLoading && (
            <View style={AddEntryStyle.buttonGroup}>
              <View style={AddEntryStyle.saveButton}>
                <Button title="Save Entry" onPress={saveEntry} color="#fff" />
              </View>
              <View style={AddEntryStyle.cancelButton}>
                <Button title="Cancel" onPress={cancelEntry} color="#fff" />
              </View>
            </View>
          )}
        </>
      )}
      {locationLoading && (
        <ActivityIndicator size="large" color="#0000ff" style={AddEntryStyle.loadingIndicator} />
      )}
      {location && (
        <View style={AddEntryStyle.textContainer}>
          <Text style={[AddEntryStyle.text, { color: textColor }]}>
            Latitude: {location.coords.latitude} | Longitude: {location.coords.longitude}
          </Text>
          <Text style={[AddEntryStyle.text, { color: textColor }]}>Address: {address}</Text>
        </View>
      )}
      {errorMsg && <Text style={AddEntryStyle.error}>{errorMsg}</Text>}
    </View>
  );
};

export default AddEntryScreen;

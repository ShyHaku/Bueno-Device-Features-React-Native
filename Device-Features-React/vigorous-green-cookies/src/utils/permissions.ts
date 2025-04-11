import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

export const requestPermissions = async () => {
  const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
  const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
  const { status: notifStatus } = await Notifications.requestPermissionsAsync();

  return {
    cameraGranted: cameraStatus === 'granted',
    locationGranted: locationStatus === 'granted',
    notificationsGranted: notifStatus === 'granted',
  };
};

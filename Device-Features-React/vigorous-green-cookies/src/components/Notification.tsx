import * as Notifications from 'expo-notifications';

export const triggerNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Travel Diary',
      body: 'Your travel entry was saved!',
    },
    trigger: null,
  });
};

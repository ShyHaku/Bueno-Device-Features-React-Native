import React, { useRef, useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

type Props = {
  onPictureTaken: (uri: string) => void;
};

const CameraComponent: React.FC<Props> = ({ onPictureTaken }) => {
  const cameraRef = useRef<Camera | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      onPictureTaken(photo.uri);
    }
  };

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <View><Button title="Camera permission not granted" /></View>;

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} type={Camera.Constants.Type.back} />
      <Button title="Take Picture" onPress={takePicture} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
});

export default CameraComponent;

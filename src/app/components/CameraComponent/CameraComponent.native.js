"use client";
import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraComponent() {
  const cameraRef = useRef(null);

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});


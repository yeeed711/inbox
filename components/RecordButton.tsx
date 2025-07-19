import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { IconSymbol } from './ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface RecordButtonProps {
  onPress: () => void;
  isRecording: boolean;
}

export function RecordButton({ onPress, isRecording }: RecordButtonProps) {
  const colorScheme = useColorScheme();
  
  return (
    <TouchableOpacity 
      style={[styles.container, isRecording && styles.recording]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.button, isRecording && styles.buttonRecording]}>
        <IconSymbol 
          size={30} 
          name={isRecording ? "stop.fill" : "mic.fill"} 
          color="#FFFFFF" 
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    zIndex: 10,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FF453A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  recording: {
    transform: [{ scale: 1.1 }],
  },
  buttonRecording: {
    backgroundColor: '#FF453A',
  },
});
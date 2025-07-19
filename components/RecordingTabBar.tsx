import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { IconSymbol } from './ui/IconSymbol';

interface RecordingTabBarProps {
  timer: number;
  onStopPress: () => void;
}

export function RecordingTabBar({ timer, onStopPress }: RecordingTabBarProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabBar}>
        <View style={styles.leftSection}>
          <View style={styles.recordingIndicator} />
          <Text style={styles.recordingText}>녹음 중</Text>
        </View>
        
        <Text style={styles.timer}>{formatTime(timer)}</Text>
        
        <TouchableOpacity style={styles.stopButton} onPress={onStopPress}>
          <View style={styles.stopButtonInner}>
            <IconSymbol size={24} name="stop.fill" color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1C1C1E',
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingBottom: 20,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  recordingIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF453A',
    marginRight: 8,
  },
  recordingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  timer: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  stopButton: {
    flex: 1,
    alignItems: 'flex-end',
  },
  stopButtonInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF453A',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
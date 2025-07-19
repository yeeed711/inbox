import React, { createContext, useContext, useState, ReactNode } from 'react';
import { RecorderState } from "@simform_solutions/react-native-audio-waveform";

interface RecordingContextType {
  isRecording: boolean;
  setIsRecording: (value: boolean) => void;
  recordingTime: number;
  setRecordingTime: (value: number) => void;
  liveRecorderState: RecorderState;
  setLiveRecorderState: (value: RecorderState) => void;
}

const RecordingContext = createContext<RecordingContextType | undefined>(undefined);

export function RecordingProvider({ children }: { children: ReactNode }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [liveRecorderState, setLiveRecorderState] = useState<RecorderState>(RecorderState.stopped);

  return (
    <RecordingContext.Provider 
      value={{ 
        isRecording, 
        setIsRecording, 
        recordingTime, 
        setRecordingTime,
        liveRecorderState,
        setLiveRecorderState
      }}
    >
      {children}
    </RecordingContext.Provider>
  );
}

export function useRecording() {
  const context = useContext(RecordingContext);
  if (!context) {
    throw new Error('useRecording must be used within a RecordingProvider');
  }
  return context;
}
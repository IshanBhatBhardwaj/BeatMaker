// MapContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Howl } from 'howler';

type SoundMapContextType = {
  soundMap: Map<string, (string | Howl)[]>;
  setSoundMap: React.Dispatch<React.SetStateAction<Map<string,  (string | Howl)[]>>>;
};

const SoundMapContext = createContext<SoundMapContextType | undefined>(undefined);

const kick = new Howl({src: ["/kick.mp3", "/kick.mp3"], preload: true})
const snare = new Howl({src: ["/snare.mp3", "/snare.mp3"], preload: true})
const hiHat = new Howl({src: ["/hi-hat.mp3", "/hi-hat.mp3"], preload: true})

export const MapContextProvider = ({ children }: { children: ReactNode }) => {
   const [soundMap, setSoundMap] = useState<Map<string, (string | Howl)[]>>(new Map([
    ["j", [kick]],
    ["d", [snare]],
    ["i", [hiHat]]
   ]));
   
  return (
    <SoundMapContext.Provider value={{ soundMap, setSoundMap }}>
      {children}
    </SoundMapContext.Provider>
  );
};

export const useSoundMapContext = () => {
  const context = useContext(SoundMapContext);
  if (!context) throw new Error('useSoundMap must be used within a MapProvider');
  return context;
};
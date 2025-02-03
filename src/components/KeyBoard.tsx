import { playHowlSound } from "@/app/utils/howlUtils/HowlUtils";
import { useSoundMapContext } from "@/contexts/mapContext";
import { isHowl } from "@/app/utils/howlUtils/HowlUtils";
import { isSpriteHowl } from "@/app/utils/howlUtils/HowlUtils";
import { useState, useEffect } from "react";

interface Beat {
    key: string,
    timeStamp: number
}

const KeyBoard = () => {
    const soundMap = useSoundMapContext();
    const [beats, setBeat] = useState<Beat[]>([])
    const [layers, setLayers] = useState<Beat[][]>([])
    const [looping, setLooping] = useState<boolean>(false)
    const [bpm, setBpm] = useState<number>(100)
    const [bars, setBars] = useState<number>(8)


    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
    }, [])
    

    const timeout = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleKeyPress = (e: KeyboardEvent) => {
        const keyPressed = e.key;

        const soundMapValue = soundMap.soundMap.get(keyPressed);
        const currentTime = Date.now();
        setBeat((prevBeat) => [...prevBeat, {key: keyPressed, timeStamp: currentTime}]);
       
        if (soundMapValue === undefined) {return};

        playHowlSound(soundMapValue);
   }

   const testMe = () => {
    setLayers((prevLayer) => [...prevLayer, beats])
    setBeat([]);
   }

   //BUG FIX: Each beat should NOT start right away. We have fill each Beat[] with an "empty" beat that just has a timeStamp. That way we can play a pause if the beat starts on a 2 and not a 1
   //Get the structure to work right. We should be able to add beats easily!! And while the loop is playing!!!
    const playLayer = async (layer: Beat[]) => {

        let timePerBaMs = (60 * bars / bpm) * 1000;
        console.log(timePerBaMs);
       if (layer.length === 0) return;
   
       let prevTime = layer[0].timeStamp;
       while (looping) {
        let curTime = Date.now();
        for (const beat of layer) {
            const delay = beat.timeStamp - prevTime;
            prevTime = beat.timeStamp;
   
            await timeout(delay);
   
            const value = soundMap.soundMap.get(beat.key);
   
            if (value === undefined) {return};
   
            playHowlSound(value);
          };
          const totalTime = (Date.now() - curTime);
          await timeout(timePerBaMs - totalTime);
        }
     };

    const playAllLayers = async() => {
        if (layers.length === 0) {return};
        
        let curTime = Date.now();

        await Promise.all(layers.map(layer => playLayer(layer)));

        const totalTime = Date.now() - curTime;
        await timeout(4800 - totalTime)
    }
  

    return (
        <div>  
            <button onClick={playAllLayers}>NO WAY NO WAY</button>
            <button onClick={testMe}>Test Me</button>
            <button onClick={() => setLooping(!looping)}>{looping ? "Stop looping" : "Start Looping"}</button>
        </div>
    )
}

export default KeyBoard;
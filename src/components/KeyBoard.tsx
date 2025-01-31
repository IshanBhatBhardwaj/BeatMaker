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

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
    }, [])
    

    const timeout = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleKeyPress = (e: KeyboardEvent) => {
        console.log("called")
        const keyPressed = e.key;

        const soundMapValue = soundMap.soundMap.get(keyPressed);
        const currentTime = Date.now();
        setBeat((prevBeat) => [...prevBeat, {key: keyPressed, timeStamp: currentTime}]);
       
        if (soundMapValue === undefined) {return};

        playHowlSound(soundMapValue);
   }


    const playLoop = async () => {
       if (beats.length === 0) return;
   
       let prevTime = beats[0].timeStamp;
        for (const beat of beats) {
         const delay = beat.timeStamp - prevTime;
         prevTime = beat.timeStamp;

         await timeout(delay);
         console.log(delay)

         const value = soundMap.soundMap.get(beat.key);

         if (value === undefined) {return};

         playHowlSound(value);
       };
     };
  

    return (
        <div>  
            <button onClick={playLoop}>NO WAY NO WAY</button>
        </div>
    )
}

export default KeyBoard;
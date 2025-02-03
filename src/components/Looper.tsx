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
    const [looping, setLooping] = useState<boolean>(false)

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
   }


    const playLoop = async () => {
       if (beats.length === 0) return;
   
       let prevTime = beats[0].timeStamp;
       while (looping) {
        let curTime = Date.now();
        for (const beat of beats) {
            const delay = beat.timeStamp - prevTime;
            prevTime = beat.timeStamp;
   
            await timeout(delay);
            console.log(delay)
   
            const value = soundMap.soundMap.get(beat.key);
   
            if (value === undefined) {return};
   
            playHowlSound(value);
          };
          const totalTime = (Date.now() - curTime);
          await timeout(4800 - totalTime);
        }
     };
  
     //so we DO need a set tempo + how many bars we wanna record
     // Then calculate time length by doing 60 / BPM * 8

    return (
        <div>  
            <button onClick={playLoop}>NO WAY NO WAY</button>
            <button onClick={() => setLooping(!looping)}>{looping ? "Stop looping" : "Start Looping"}</button>
        </div>
    )
}

export default KeyBoard;
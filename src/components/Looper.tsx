import {useState} from "react"
import { useSoundMapContext } from "@/contexts/mapContext"
import { playHowlSound } from "@/app/utils/howlUtils/HowlUtils"
interface Beat {
    key: string,
    timeStamp: number
}

const Looper = () => {

    const [beats, setBeat] = useState<Beat[]>([])
    let soundMap = useSoundMapContext();

    const handleKeyPress = (e: KeyboardEvent) => {
        const keyPressed = e.key;
        const currentTime = Date.now();
        setBeat((prevBeat) => [...prevBeat, {key: keyPressed, timeStamp: currentTime}])
   }

   const playLoop = () => {
    if (beats.length === 0) return;

    let currentTime = Date.now();

    beats.forEach((beat, index) => {
      const delay = beat.timeStamp - (Date.now() - currentTime);
      setTimeout(() => {
        const value = soundMap.soundMap.get(beat.key);

        if (value === undefined) {return};

        playHowlSound(value);
     
      }, delay);
    });
  };


    window.addEventListener("keydown", handleKeyPress);

    return (
        <div>  
          <button onClick={playLoop}>No way this works</button>
        </div>
    )
}

export default Looper;
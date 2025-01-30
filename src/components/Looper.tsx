import {useState} from "react"
import { useSoundMapContext } from "@/contexts/mapContext"
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
        let howl = value[0];
        let name = value[1];


      }, delay);
    });
  };


    window.addEventListener("keydown", handleKeyPress);

    return (
        <div>  
        </div>
    )
}

export default Looper;
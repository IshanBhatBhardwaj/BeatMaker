
'use client'
import {Howl, Howler} from "howler";
import {useState, useRef} from "react";
import { useSoundMapContext } from "@/contexts/mapContext";
import Slider from 'rc-slider'; 
import 'rc-slider/assets/index.css';

const SplitAudio : React.FC = () => {
    const [key, setKey] = useState("");
    const [audiFilestartTime, setAudioFileStartTime] = useState(0); // Start time in seconds
    const [audioFileEndTime, setAudioFileEndTime] = useState(10);   // End time in seconds
    const [audioFileDuration, setAudioFileDuration] = useState(0);  // Duration of the audio
    const [range, setRange] = useState<[number, number]>([0, 50]);
    const [src, setSrc] = useState<string>("");
    const [audioFile, setAudioFile] = useState<File | undefined>(undefined);
    const audioRef = useRef<Howl | null>(null);

    const soundMap = useSoundMapContext();

    const handleRangeChange = (value: number | number[]) => {
        if (Array.isArray(value) && value.length === 2) {
            setAudioFileStartTime(value[0]);
            setAudioFileEndTime(value[1]);
            setRange(value as [number, number]); // Explicitly cast to [number, number]
        }
      };
    
    // used for non sprite instances 
    const createHowlInstance = (src: string) : Howl => {
        return new Howl({
            src: src,
            format: ["mp3", "wav"],
            preload: true
        });
    }

    const createHowlSpriteInstance = (src: string, name: string, offset: number, duration: number) : Howl => {
        return new Howl({
            src: src,
            format: ["mp3", "wav"],
            preload: true,
            sprite: {
                [name]: [offset, duration]
            }
        });
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {return};

        const blobURL = URL.createObjectURL(file);
        setSrc(blobURL);
        setAudioFile(file);

        initializeAudio(blobURL);
    }

    const onSumbit = () => {
        if (audioFile === undefined) {return};

        let audio = createHowlSpriteInstance(src, audioFile.name, audiFilestartTime*1000, (audioFileEndTime-audiFilestartTime)*1000);
        let updatedSoundMap = soundMap.soundMap.set(key, [audio, audioFile.name]);

        soundMap.setSoundMap(updatedSoundMap);
    }

    const initializeAudio = (path: string) => {
        const audio = new Howl({
            src: path,
            format: ["mp3", "wav"],
            preload: true,
            onload: () => {
                setAudioFileDuration(audio.duration());
            }
        })
        audioRef.current = audio;
    };

    const playSnippet = () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.seek(audiFilestartTime); // Seek to start time
          audioRef.current.play();
    
          // Stop playback when the end time is reached
          setTimeout(() => {
            if (audioRef.current?.playing()) {
              audioRef.current.stop();
            }
          }, (audioFileEndTime - audiFilestartTime) * 1000); // Calculate duration in milliseconds
        }
      };

    return (
        <div>
            <h1>Audio Splitter</h1>
            {/* <button onClick={initializeAudio}>Load Audio</button> */}
            <button onClick={playSnippet}>Play Snippet</button>
            <input type="file" accept="audio/*" onChange={handleFileChange}></input>
            <input type="text" onChange={(e) => setKey(e.target.value)}/>
            <button onClick={onSumbit}>SUBMIT BRU</button>
            {/* <button onClick={finalizeSnippet}>Finalize Snippet</button> */}
            <div style={{ width: '300px', margin: '50px auto' }}>
                <h2>Start: {range[0]}, End: {range[1]}</h2>
                <Slider
                    range={true}
                    min={0}
                    max={audioFileDuration}
                    value={range}
                    onChange={handleRangeChange}
                    allowCross={false} // Prevents handles from crossing each other
                />
                </div>
        </div>
    )
}

export default SplitAudio;
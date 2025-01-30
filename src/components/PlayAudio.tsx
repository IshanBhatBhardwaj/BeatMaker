
import {useState, useRef, useEffect} from "react";

//need this to take in props 
const PlayAudio = () => {

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null);

  // for more advanced stuff
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    
    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;

    if (audioRef.current) {
      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(audioContext.destination);
      // sourceRef.current = source;
    }

    return (() => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    });

  },[])

  const handlePlay = () => {
    if (!audioRef.current || !audioContextRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      audioRef.current.play();
      setIsPlaying(true);
    }
  }


  return (
    <div>
      <audio
      ref={audioRef}
      src={"../../../creep.mp3"}
      preload="auto"
      />

      <button className="border border-1 border-black px-2 m-10" onClick={handlePlay}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
}

export default PlayAudio;

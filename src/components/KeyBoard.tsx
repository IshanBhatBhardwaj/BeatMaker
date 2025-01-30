import { useSoundMapContext } from "@/contexts/mapContext";

const KeyBoard = () => {
    const soundMap = useSoundMapContext();

    const isHowl = (item : Howl | string): item is Howl => {
        return (item as Howl).play() !== undefined;
    }

    const isSpriteHowl = (item : Howl | string, name: string): item is Howl => {
        return (item as Howl).play(name) !== undefined;
    }

    const handleKeyPress = (e: KeyboardEvent) => {
        const keyPressed = e.key;
        const value = soundMap.soundMap.get(keyPressed);

        if ( value === undefined) {return};

        let howl = value[0];
        if (value.length > 1) {
            let name = value[1];

            if (typeof name === "string" && isSpriteHowl(howl, name)) {
                if (howl.playing()) {
                    howl.pause();
                }
                howl.play(name);
            }
        }
        else {
            if (isHowl(howl)) {
                if (howl.playing()) {
                    howl.pause();
                }
                howl.play();
            }
        }
   }

    window.addEventListener("keydown", handleKeyPress);

    return (
        <div>  
        </div>
    )
}

export default KeyBoard;
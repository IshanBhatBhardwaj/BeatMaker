
export const isHowl = (item : Howl | string): item is Howl => {
    return (item as Howl).play() !== undefined;
}

export const isSpriteHowl = (item : Howl | string, name: string): item is Howl => {
    return (item as Howl).play(name) !== undefined;
}

export const playHowlSound = (soundMapValue : (Howl | string)[]) => {

    let howl = soundMapValue[0];
        if (soundMapValue.length > 1) {
            let name = soundMapValue[1];

            if (typeof name === "string" && isSpriteHowl(howl, name)) {
                if (howl.playing()) {
                    howl.pause();
                }
                howl.play(name);
            }
        }
        else if ((isHowl(howl))) {
            if (howl.playing()) {
                howl.pause();
            }
            howl.play();
        }
}
import {Howl, Howler} from "howler";
import { IUserHowler } from "./i-userhowler";

export class UserHowler implements IUserHowler {

    storage: Map<string, Howl>;

    constructor() {
        this.storage = new Map<string, Howl>();
    }

    createHowler(file: File, start: number, end: number) {

        const blobUrl : string = URL.createObjectURL(file);
        const fileName : string = file.name;

        //we should make a folder for just interfaces and put this there
        interface SpriteBody {
            [name:string] : [number, number] | [number, number, boolean]
        }

        const spriteBody : SpriteBody= {
            fileName: [start, end]
        }

        const audio = new Howl({
            src: blobUrl,
            sprite: spriteBody 
        });

        this.storage.set(fileName, audio);
    }
  
    playHowler(fileName: string) {

        const howler = this.storage.get(fileName);

        if (howler) {
            howler.play(fileName);
        }
    }

}
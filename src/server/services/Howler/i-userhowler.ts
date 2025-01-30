export interface IUserHowler {
    createHowler(file: File, start: number, end:number) : void,
    playHowler(fileName: string): void
}
export default interface Game {
    content: any;
    container: HTMLDivElement;
    get(): void;
    list(): void;
}
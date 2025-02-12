export class Timeout {
    id: number;
    handler;


    constructor(handler: TimerHandler, tempo: number) {
        this.id = setTimeout(handler, tempo);
        this.handler = handler;
    }

    clear() {
        clearTimeout(this.id);
    }
}
export class Timeout {
    id: number;
    handler;
    start;
    timeLeft;

    constructor(handler: TimerHandler, tempo: number) {
        this.id = setTimeout(handler, tempo);
        this.handler = handler;

        this.start = Date.now();
        this.timeLeft = tempo;
    }

    clear() {
        clearTimeout(this.id);
    }

    pause() {
        //quanto tempo passou desde que timeout comecou
        const timePassed = Date.now() - this.start;

        this.timeLeft = this.timeLeft - timePassed;

        this.clear();
    }

    continue() {
        this.clear();
        //reinicia o timeout com o tempo restante, criando um novo ID
        this.id = setTimeout(this.handler, this.timeLeft);

        //define data de inicio novamente
        this.start = Date.now();
    }
}
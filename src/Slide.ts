import {Timeout} from "./Timeout.ts";

export default class Slide {

    container;
    slides;
    controls;
    time;

    index: number;
    slide: Element;
    timeout: Timeout | null;
    pausedTimeout: Timeout | null;

    paused: boolean;

    constructor(container: Element, slides: Element[], controls: Element,
                time: number = 5000) {

        this.container = container;
        this.slides = slides;
        this.controls = controls;
        this.time = time;

        this.index = 0;
        this.slide = this.slides[this.index];

        this.timeout = null;
        this.pausedTimeout = null;
        this.paused = false;
        this.init();

    }

    hide (element: Element) {
        element.classList.remove('active');

        if (element instanceof HTMLVideoElement) {
            //bota o video no inicio
            element.currentTime = 0;
            element.pause();

        }
    }

    show(index: number) {
        //salva o item que está ativo no momento para métodos futuros
        this.index = index;

        //salva o elemento que está ativo no momento para métodos futuros
        this.slide = this.slides[this.index];

        this.slides.forEach(element => this.hide(element));

        this.slide.classList.add('active');

        //define o tempo do slide
        if (this.slide instanceof HTMLVideoElement) {
            this.autoVideo(this.slide);
        } else {
            this.autoSlide(this.time);
        }
    }

    autoVideo(video: HTMLVideoElement) {
        video.muted = true;
        video.play();

        let firstPlay = true;

        video.addEventListener('playing', () => {
            if (firstPlay) {
                firstPlay = false;
                const duration = video.duration * 1000;
                this.autoSlide(duration);
            }
        })
    }

    prev() {
        if (this.paused) return;

        const prev = (this.index - 1) > 0? this.index - 1 : this.slides.length - 1;
        this.show(prev);

    }

    next() {
        if (this.paused) return;
        const next = (this.index + 1) < this.slides.length ? this.index + 1 : 0;
        this.show(next);

    }

    pause() {
        this.pausedTimeout = new Timeout(() => {
            this.paused = true;

            this.timeout?.pause();

            if (this.slide instanceof HTMLVideoElement) {
                this.slide.pause();
            }

        }, 300);
    }

    continue() {
        this.pausedTimeout?.clear();

        if (this.paused) {
            this.paused = false;

            this.timeout?.continue();

            if (this.slide instanceof HTMLVideoElement) {
                this.slide.play();
            }
        }
    }

    private autoSlide(time: number) {
        this.timeout?.clear();
        this.timeout = new Timeout(() => this.next(), time);
    }


    private addControls() {
        const prevButton = document.createElement('button');
        const nextButton = document.createElement('button');
        prevButton.innerText = "Slide Anterior";
        nextButton.innerText = "Próximo Slide";

        this.controls.appendChild(prevButton);
        this.controls.appendChild(nextButton);

        this.controls.addEventListener('pointerdown', () => this.pause());
        this.controls.addEventListener('pointerup', () => this.continue());

        prevButton.addEventListener('pointerup', () => this.prev());
        nextButton.addEventListener('pointerup', () => this.next());
    }

    private init() {
        this.addControls();
        this.show(this.index);
    }
}



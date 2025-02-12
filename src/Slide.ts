export default class Slide {

    container;
    slides;
    controls;
    time;

    index: number;
    slide: Element;

    constructor(container: Element, slides: Element[], controls: Element,
                time: number = 5000) {

        this.container = container;
        this.slides = slides;
        this.controls = controls;
        this.time = time;

        this.index = 0;
        this.slide = this.slides[this.index];

        this.init();

    }

    hide (element: Element) {
        element.classList.remove('active');
    }

    show(index: number) {
        //salva o item que está ativo no momento para métodos futuros
        this.index = index;

        //salva o elemento que está ativo no momento para métodos futuros
        this.slide = this.slides[this.index];

        this.slides.forEach(element => this.hide(element));

        this.slide.classList.add('active');
    }

    prev() {
        const prev = (this.index - 1) > 0? this.index - 1 : this.slides.length - 1;
        this.show(prev);

    }

    next() {
        const next = (this.index + 1) < this.slides.length ? this.index + 1 : 0;
        this.show(next);
    }

    private addControls() {
        const prevButton = document.createElement('button');
        const nextButton = document.createElement('button');
        prevButton.innerText = "Slide Anterior";
        nextButton.innerText = "Próximo Slide";

        this.controls.appendChild(prevButton);
        this.controls.appendChild(nextButton);

        prevButton.addEventListener('pointerup', () => this.prev());
        nextButton.addEventListener('pointerup', () => this.next());
    }

    private init() {
        this.addControls();
        this.show(this.index);
    }
}



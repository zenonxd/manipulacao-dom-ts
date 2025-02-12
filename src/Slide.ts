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

        this.show(this.index);

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
}



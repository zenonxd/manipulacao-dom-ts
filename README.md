# About

Projeto da etapa 07 do curso de TypeScript da Origamid.

Iremos fazer manipulação de DOM utilizando TS para fazer um slide (tipo stories do Instagram).

## Estrutura do projeto

### HTML

### CSS

### TypeScript

Iremos trabalhar com um módulo para lidar com a div que contém tudo (o container).

Criaremos um módulo ``Slide.ts``. A pessoa que for utilizar, necessariamente precisa passar no construtor o: container,
os elementos (uma array), os controles e o tempo (que por padrão será 5000 milissegundos).

#### Slide.ts

![img.png](img.png)

Agora, com a classe criada e devidamente exportada, iremos utilizá-la no arquivo TS principal.

#### Main.ts

Agora, é o padrão, selecionar os elementos que criamos no HTML, verificar se eles existem e instanciar a classe.

**IMPORTANTE:** quando selecionamos a classe ``slide-elements`` que irão conter os elementos filhos a serem utilizados, ele
nos retorna uma ``HTMLCollection``. Entretanto, na nossa classe nós queremos um Array de Element.

Para resolver isso, é fácil! Basta converter utilizando ``Array.from``. E, além disso, selecionamos essa ``HTMLCollection``,
para verificar sua length, isto é, para verificar se existe ao menos um elemento ali dentro.

```ts
import Slide from "./Slide.ts";

const container = document.getElementById("slide");
const elements = document.getElementById("slide-elements");
const controls = document.getElementById("slide-controls");

if (container && elements && controls && elements.children.length) {
    new Slide(container, Array.from(elements.children), controls, 3000);
}
```

Vamos agora, começar a construir o processo de slides!

#### Show slide

Para que o slide apareça, precisamos que ele tenha a classe ``active``, correto?

Dentro da classe de ``Slide``, podemos começar criando um método ``show()``, que receberá um index (number). Ora, os slides
estão dentro de uma Array, certo? Então precisamos acessar o item em questão.

Só tem um problema. Se chegássemos no método e simplesmente adicionássemos a classe ``active``, as outras imagens
permaneceriam com a classe.

Então, faremos o seguinte:

1. Criaremos um método chamado ``hide(element: Element)``. Ele irá receber um elemento e iremos remover a sua classe ``active``.
2. Agora, dentro do método show, podemos pegar o Array de slides (que criamos no início e é o Array com os itens), 
fazer um loop por ele e utilizando o método hide no elemento em questão. 
3. Após isso, podemos adicionar a classe ``active``.
4. **Um adendo: Podemos criar duas variáveis nessa classe, index e slide. Serão variáveis responsáveis por salvar qual index/slide
está ativo no momento.**

**Lembrete! Sempre que criamos uma nova propriedade/atributo, ele PRECISA ser instanciado dentro do construtor da classe.**

##### hide() & show()

```ts
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
```

⬇️ Veja as duas variáveis criadas e sendo instanciadas dentro do construtor (podendo agora, utilizar o ``this.index``) dentro
da chamada do método ``show()``.

![img_1.png](img_1.png)

Agora, dentro do ``Main.ts``, podemos utilizar o método ``show()``:

![img_2.png](img_2.png)
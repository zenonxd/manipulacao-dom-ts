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
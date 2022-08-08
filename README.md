# ShoppingCart-ApiMercadolivre
<section>
Bem vindos(as) ao meu repositorio do projetinho de Front-end Shopping Cart desenvolvido junto as aulas da Trybe.
</section>
<br/>
<section>
  <summary><strong>👨‍💻 O que deverá ser desenvolvido</strong></summary><br />

Foi desenvolvido um **carrinho de compras** totalmente dinâmico! 🛒

Para isso, os dados vieram diretamente de uma **API!** 🤩 (Application Programming Interface), uma API é um ponto de contato na internet com determinado serviço e nesse projeto foi utilizada a API do Mercado Livre para buscar produtos à venda. 🏷

Nesse projeto foi posto em pratica o desenvolvimento orientado a testes, o famoso TDD (Test Driven Development)! Que te ajuda a garantir um código de qualidade, percebendo os casos de uso da sua aplicação e garantindo que ela está funcionando da maneira correta! 🚀

A visualisação do prototipo pode ser observada pelo gif abaixo:

![Project Gif](./prototipo.gif)
</section>
<br/>
<section>
<summary><strong>🏗 Estrutura do projeto</strong></summary><br />

O projeto contem os arquivos `index.html`, `style.css` e `script.js`, que conterão seu código HTML, CSS e JavaScript, respectivamente. 

O arquivo `scripts.js` contém uma estrutura de código inicial, que cria alguns elementos HTML. 

É no `script.js` que foi implementada a lógica para desenvolver o projeto. 

<section>
  <summary>
    Abaixo estão as saber funçoes e o que ela faz:
  </summary> <br />

  - `createProductImageElement`: Cria um elemento de imagem;
  - `createCustomElement`: Estrutura para criar um elemento;
  - `createProductItemElement`: Cria a lista de produtos;
  - `getSkuFromProductItem`: Pega o `id` de um produto;
  - `cartItemClickListener`: Escuta a ação de clicar em um item no carrinho;
  - `createCartItemElement`: Cria os elementos do carrinho.

</section>

A pasta `helpers` contém os arquivos `fetchItem.js`, `fetchProducts.js`, `getSavedCartItems.js` e `saveCartItems.js` e cada um possui uma estrutura para implementar cada uma das usando código JavaScript.

A pasta `tests`, contém os arquivos `fetchItem.test.js`, `fetchProducts.test.js`, `getSavedCartItems.test.js` e `saveCartItems.test.js`, onde vai implementar os testes para cada uma das funções de mesmo nome.

</section>

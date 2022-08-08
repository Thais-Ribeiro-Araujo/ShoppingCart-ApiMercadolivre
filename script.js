const newList = document.querySelector('ol');
// para entender a estrutura logica utilizei as fontes abaixo
// https://softauthor.com/javascript-working-with-images/#:~:text=Create%20Image%20Element%20in%20JavaScript,URL%20to%20its%20src%20attribute.&text=Finally%2C%20add%20the%20image%20element,it%20to%20the%20body%20element.
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}
// https://developer.mozilla.org/pt-BR/docs/Web/Web_Components/Using_custom_elements
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}
// Requisito feito com ajuda de mentoria, logica desenvolvida atraves de esclarecimentos nas salas de estudo e de mentoria
// t
function sumPrice() {
  const prices = Array.from(document.querySelectorAll('.cart__item'));  
 
  const soma = prices.reduce((acc, crr) => (
    acc + parseFloat(crr.innerText.split('PRICE: $')[1])
  ), 0);
  const aleluia = document.querySelector('.total-price');
  aleluia.innerText = soma;
  return soma;
}

function cartItemClickListener(event) {
  event.target.remove();
  sumPrice();
  saveCartItems(newList);
}
// https://www.youtube.com/watch?v=YeFzkC2awTM esse video foi essencial para entendimento do requisito e as fontes abaixo
// https://www.freecodecamp.org/news/code-a-shopping-cart-with-javascript/
// https://www.section.io/engineering-education/javascript-shopping-cart-using-arrays-and-objects/
function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener); 
  
  return li;
}

function createProductItemElement(productItem) {
  const { sku, name, image } = productItem;
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', async () => {
    const fetchItemSaved = await fetchItem(sku);
    const liCartItem = createCartItemElement(fetchItemSaved);
    newList.appendChild(liCartItem);
    sumPrice();
    saveCartItems(newList);
  });
  
  section.appendChild(button);
  return section;
}
// https://stackoverflow.com/questions/60780896/simple-search-api
// https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data-pt
async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  });
  document.querySelector('.loading').remove();
  return li;
}
// https://desenvolvimentoparaweb.com/javascript/como-loading-de-javascript-funciona-domcontentloaded-e-onload/
function loading() {
  const savedItems = getSavedCartItems();
  newList.innerHTML = savedItems;
}

const btnClear = document.querySelector('.empty-cart');
btnClear.addEventListener('click', () => {
  document.querySelector('.total-price').innerHTML = 0;
    newList.innerHTML = '';
    getSavedCartItems(newList);
});
// https://acervolima.com/como-executar-uma-funcao-quando-a-pagina-e-carregada-em-javascript/
window.onload = () => { 
  searchProducts('computador');
  loading();
};
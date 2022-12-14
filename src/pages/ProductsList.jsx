import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import CategoryList from '../components/CategoryList';
import Product from '../components/Product';
import { getProductsFromCategoryAndQuery } from '../services/api';
import './ProductList.css';
import { getSavedCartProducts } from '../services/localStorage';
import Header from '../components/Header';
import sortProducts from '../services/extraFunctions';

export default class ProductsList extends Component {
  state = {
    searchInput: '',
    buttonClicked: false,
    mapProducts: [],
    cartSize: 0,
    sorting: '',
  }

  componentDidMount() {
    this.getCartLength();
  }

  getCartLength = () => {
    const cart = getSavedCartProducts();
    this.setState({ cartSize: !cart ? 0 : cart.length });
  }

  // reconhece mudança nos inputs
  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  // altera o estado do botão
  // para fazer o redirecionamento
  handleClick = () => {
    this.setState({ buttonClicked: true });
  }

  // verifica se a busca veio do input ou de um botão de categoria
  queryOrId = async () => {
    const { searchInput } = this.state;
    if (searchInput.includes('MLB')) {
      const result = await getProductsFromCategoryAndQuery(searchInput, undefined)
        .then((data) => data);
      return result;
    }
    const result = await getProductsFromCategoryAndQuery(undefined, searchInput)
      .then((data) => data);
    return result;
  }

  // procura os produtos
  // (ocorre após a função de cima)
  searchProducts = async () => {
    const products = await this.queryOrId()
      .then((response) => response);
    this.setState({
      mapProducts: products.results,
    });
  }

  // busca produtos por categoria
  handleCategoryButton = async ({ target }) => {
    const products = await getProductsFromCategoryAndQuery(target.id, undefined)
      .then((data) => data);
    this.setState({
      mapProducts: products.results,
    });
  }

  // mapeia produtos de acordo com seletor de ordenação
  getProducts = (myProducts) => {
    const { sorting } = this.state;
    if (sorting === '') {
      return this.mapingProductElements(myProducts);
    }
    const sortedProducts = sortProducts(myProducts, sorting);
    return this.mapingProductElements(sortedProducts);
  }

  // mapeia os produtos, acionado na função getProducts
  mapingProductElements = (myProducts) => (
    myProducts.map((product) => (
      <Product
        key={ product.id }
        product={ product }
        getCartLength={ this.getCartLength }
      />
    ))
  )

  render() {
    const { searchInput, buttonClicked, mapProducts, cartSize } = this.state;
    const stringOfCartSize = JSON.stringify(cartSize);
    const { history } = this.props;

    return (
      <div>
        <main className="flexColumn centered main">
          <Header hist={ history } />

          <section className="flex centered searchContainer">

            {/* input de busca */}
            <input
              name="searchInput"
              type="text"
              value={ searchInput }
              onChange={ this.handleChange }
              data-testid="query-input"
              className="searchInput"
            />

            {/* botão de busca */}
            <button
              data-testid="query-button"
              type="button"
              onClick={ this.searchProducts }
              className="queryButton"
            >
              Pesquisar
            </button>
            {mapProducts.length > 0 && (
              <select name="sorting" id="sorting" onChange={ this.handleChange }>
                <option value="" defaultValue="">Ordenar por:</option>
                <option value="lowPrice">Menor preço</option>
                <option value="highPrice">Maior preço</option>
              </select>
            )}

            {/* botão de ir ao carrinho */}
            <button
              type="button"
              onClick={ this.handleClick }
              data-testid="shopping-cart-button"
              className="shoppingButton"
            >
              <span data-testid="shopping-cart-size">{ stringOfCartSize }</span>
            </button>

            {/* condicional do redirecionamento */}
            {buttonClicked && <Redirect
              to="/shopping-cart"
              data-testid="shopping-cart-button"
            />}

          </section>

          {/* lista de categorias */}
          <CategoryList handleCategoryButton={ this.handleCategoryButton } />

          {/* mensagem antes da busca ser realizada */}
          { mapProducts.length === 0 && (
            <h2
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h2>) }

          {/* condicional dos produtos */}
          { !mapProducts.length ? <p>Nenhum produto foi encontrado</p>
            : this.getProducts(mapProducts) }

        </main>
      </div>
    );
  }
}

ProductsList.propTypes = {
  history: PropTypes.shape().isRequired,
};

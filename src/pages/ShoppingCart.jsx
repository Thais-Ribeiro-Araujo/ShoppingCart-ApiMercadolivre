import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getSavedCartProducts, removeAllProduct } from '../services/localStorage';
import CartProducts from '../components/CartProducts';
import Header from '../components/Header';
import './shoppingCart.css';

export default class ShoppingCart extends Component {
  state = {
    cartWithCounter: [],
    totalCartValue: 0,
  }

  componentDidMount() {
    this.setState({
      cartWithCounter: this.countCartItems(),
    });
    this.cartTotalValueCounter();
  }

  // calcula o valor total dos itens no carrinho de compras e atualiza esse valor dinamicamente.
  cartTotalValueCounter = () => {
    const totalCart = getSavedCartProducts();
    if (!totalCart) return 0;
    const cartPrices = totalCart.map(({ price }) => price);
    this.setState({
      totalCartValue: cartPrices.reduce((acc, curr) => acc + curr, 0),
    });
  }

  // remove produtos e atualiza o estado
  removeAllOfThisProduct = (product) => {
    removeAllProduct(product);
    this.setState({
      cartWithCounter: this.countCartItems(),
    });
    this.cartTotalValueCounter();
  };

  // recebe array de produtos salvos,
  // conta itens repetidos,
  // retira itens repetidos e
  // conta a quantidade de itens adicionando a chave counter nos objetos
  countCartItems = () => {
    const totalCart = getSavedCartProducts();
    if (!totalCart) return [];
    const cartIds = totalCart.map(({ id }) => id);
    const filteredIds = [...new Set(cartIds)];
    const filteredCart = filteredIds.map((id) => totalCart.find((obj) => obj.id === id));
    return filteredCart.reduce((acc, cur) => {
      const curCount = totalCart.filter((elm) => elm.id === cur.id).length;
      const newCur = { ...cur, counter: curCount };
      return [...acc, newCur];
    }, []);
  }

  render() {
    const { cartWithCounter, totalCartValue } = this.state;

    const emptyCart = (
      <h2 data-testid="shopping-cart-empty-message">
        Seu carrinho está vazio
      </h2>);

    const mapCart = cartWithCounter.map((item, index) => (
      <CartProducts
        key={ index }
        product={ item }
        cart={ cartWithCounter }
        removeAllOfThisProduct={ this.removeAllOfThisProduct }
        cartTotalValueCounter={ this.cartTotalValueCounter }
      />
    ));
    const { history } = this.props;

    return (
      <div className="flexColumn centered">
        <Header hist={ history } />
        <h2>CARRINHO</h2>
        <div className="shoppingCartContent">
          {/* condicional que mostra carrinho ou mensagem */}
          <ul>{ cartWithCounter.length === 0 ? emptyCart : mapCart }</ul>
          <div className="cartTotal">
            <div>
              <h3>
                Subtotal:
              </h3>
              <h2 className="strong">{`R$ ${totalCartValue.toFixed(2)}`}</h2>

            </div>

            {/* link para checkout */}
            <Link
              to="/checkout"
              data-testid="checkout-products"
            >
              <button
                type="button"
                disabled={ cartWithCounter.length === 0 }
              >
                Finalizar compra
              </button>
            </Link>
          </div>

        </div>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  history: PropTypes.shape().isRequired,
};

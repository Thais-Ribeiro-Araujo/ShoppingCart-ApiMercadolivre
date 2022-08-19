const sortProducts = (myProducts, sorting) => {
  if (sorting === 'lowPrice') {
    return myProducts.sort((a, b) => a.price - b.price);
  }
  return myProducts.sort((a, b) => b.price - a.price);
};

export default sortProducts;

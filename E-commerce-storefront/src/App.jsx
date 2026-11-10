import Header from './components/Header';
import Hero from './components/Hero';
import ProductList from './components/ProductList';

import { useState } from 'react';

function App() {
  const [cart, setCart] = useState([]);
  return (
    <>
      <Header cart={cart} />
      <Hero />
      <ProductList cart={cart} setCart={setCart} />
    </>
  );
}

export default App;
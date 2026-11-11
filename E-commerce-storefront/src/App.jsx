import Header from './components/Header';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import CartDrawer from './components/CartDrawer';

import { useState,useEffect } from 'react';



function App() {
  const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem('shopease_cart');

  return savedCart ? JSON.parse(savedCart) : [];
});

useEffect(() => {
  localStorage.setItem('shopease_cart', JSON.stringify(cart));
}, [cart]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  return (
    <>
      <Header cart={cart} 
      onCartClick={()=>setIsCartOpen(true)}
      />
      <Hero />
      <ProductList cart={cart} setCart={setCart} />
      <CartDrawer
      cart={cart}
      setCart={setCart}
      onClose={()=>setIsCartOpen(false)}
      isOpen={isCartOpen}
      />
    </>
  );
}

export default App;
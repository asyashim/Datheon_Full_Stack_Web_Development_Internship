import { ShoppingBag } from 'lucide-react';
import './ProductCard.css';

import {useState} from 'react';

function ProductCard({ product,cart,setCart }) {

  const addToCart = () => {
  setCart((currentCart) => {
    const existingProduct = currentCart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      return currentCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    setShowMessage(true);

setTimeout(() => {
  setShowMessage(false);
}, 1500);

    return [...currentCart, { ...product, quantity: 1 }];
  });
};

const[showMessage, setShowMessage] = useState(false);
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <p>⭐ {product.rating.rate}</p>
      <button className="add-to-cart-btn"
      onClick={addToCart}
      >
  <ShoppingBag size={18} />
  Add to Cart
  
</button>

{showMessage && (
  <p className="success-message">
    ✓ Added to cart!
  </p>
)}
    </div>
  );
}

export default ProductCard;
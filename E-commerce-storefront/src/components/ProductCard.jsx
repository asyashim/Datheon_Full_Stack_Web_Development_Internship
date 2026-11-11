import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import './ProductCard.css';

function ProductCard({ product, cart, setCart }) {
  const [showMessage, setShowMessage] = useState(false);

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

      return [...currentCart, { ...product, quantity: 1 }];
    });

    // Display success message
    setShowMessage(true);

    // Hide message after 1.5 seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 1500);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />

      <h3>{product.title}</h3>

      <p>${product.price}</p>

      <p>⭐ {product.rating.rate}</p>

      <button
        className="add-to-cart-btn"
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
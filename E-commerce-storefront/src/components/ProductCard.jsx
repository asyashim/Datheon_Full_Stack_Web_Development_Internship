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

    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 1500);
  };

  // Determine product badge
  const rating = product.rating.rate;

  return (
    <div className="product-card">

      {/* Product Image and Badge */}
      <div className="product-image-container">
        <img src={product.image} alt={product.title} />

        {rating >= 4.5 && (
          <span className="product-badge top-rated">
            Top Rated
          </span>
        )}

        {rating >= 4 && rating < 4.5 && (
          <span className="product-badge popular">
            Popular
          </span>
        )}
      </div>

      <h3>{product.title}</h3>

      <p>${product.price}</p>

      <p>⭐ {rating}</p>

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
import { ShoppingBag } from 'lucide-react';
import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <p>⭐ {product.rating.rate}</p>
      <button className="add-to-cart-btn">
  <ShoppingBag size={18} />
  Add to Cart
</button>
    </div>
  );
}

export default ProductCard;
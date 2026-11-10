import { ShoppingBag } from 'lucide-react';
import './Header.css';

function Header({cart}) {
  return (
    <header className="header">

      {/* Store Logo and Name */}
      <div className="logo">
        <ShoppingBag size={28} />
        <h2>ShopEase</h2>
      </div>

      {/* Navigation Links */}
      <nav className="navigation">
        <a href="#home">Home</a>
        <a href="#products">Products</a>
        <a href="#categories">Categories</a>
      </nav>

      {/* Shopping Cart */}
      <div className="cart-icon">
        <ShoppingBag size={24} />
        <span>
          {cart.reduce((total, item) => total + item.quantity, 0)}
        </span>
      </div>

    </header>
  );
}

export default Header;
import { ShoppingBag } from 'lucide-react';
import './Header.css';

function Header() {
  return (
    <header className="header">

      {/* Store Logo and Name */}
      <div className="logo">
        <ShoppingBag size={28} />
        <h2>ShopEase</h2>
      </div>

      {/* Navigation Links */}
      <nav className="navigation">
        <a href="#">Home</a>
        <a href="#">Products</a>
        <a href="#">Categories</a>
      </nav>

      {/* Shopping Cart */}
      <div className="cart-icon">
        <ShoppingBag size={24} />
        <span>0</span>
      </div>

    </header>
  );
}

export default Header;
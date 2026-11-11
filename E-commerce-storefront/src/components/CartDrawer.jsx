import { X } from 'lucide-react';
import {useState} from 'react';

import './CartDrawer.css';

const CartDrawer = ({cart,setCart,onClose,isOpen}) => {

    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);

    if(!isOpen){
        return null;
    }

    // Increase product quantity
const increaseQuantity = (productId) => {
  setCart((currentCart) =>
    currentCart.map((item) =>
      item.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

// Decrease product quantity
const decreaseQuantity = (productId) => {
  setCart((currentCart) =>
    currentCart
      .map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

// Remove product from cart
const removeItem = (productId) => {
  setCart((currentCart) =>
    currentCart.filter((item) => item.id !== productId)
  );
};

// Calculate subtotal
const subtotal = cart.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);

// Shipping charge
const shipping = cart.length > 0 ? 5 : 0;

// Calculate tax (8%)
const tax = subtotal * 0.08;

// Calculate final total
const total = subtotal + shipping + tax;

const handlePlaceOrder = (event) => {
  event.preventDefault();

  setIsOrderPlaced(true);
};
    return (
  <div className="cart-overlay" onClick={onClose}>
    <div
      className="cart-drawer"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="cart-header">
        <h2>Your Shopping Cart</h2>

        <button onClick={onClose}>
          <X size={22} />
        </button>
      </div>

      <div className="cart-items">
  {cart.length === 0 ? (
    <p>Your cart is empty.</p>
  ) : (
    cart.map((item) => (
        <div className="cart-item" key={item.id}>
  <img src={item.image} alt={item.title} />

  <div className="cart-item-details">
    <h4>{item.title}</h4>

    <p className="cart-item-price">
      ${item.price.toFixed(2)}
    </p>

    <div className="quantity-controls">
      <button onClick={() => decreaseQuantity(item.id)}>
        −
      </button>

      <span>{item.quantity}</span>

      <button onClick={() => increaseQuantity(item.id)}>
        +
      </button>
    </div>

    <button
      className="remove-btn"
      onClick={() => removeItem(item.id)}
    >
      Remove
    </button>
  </div>
</div>


      
    ))
    
  )}
</div>
{cart.length > 0 && (
  <div className="cart-summary">
    <h3>Order Summary</h3>

    <div className="summary-row">
      <span>Subtotal</span>
      <span>${subtotal.toFixed(2)}</span>
    </div>

    <div className="summary-row">
      <span>Shipping</span>
      <span>${shipping.toFixed(2)}</span>
    </div>

    <div className="summary-row">
      <span>Tax (8%)</span>
      <span>${tax.toFixed(2)}</span>
    </div>

    <div className="summary-total">
      <span>Total</span>
      <span>${total.toFixed(2)}</span>
    </div>

    <button
  className="checkout-btn"
  onClick={() => setIsCheckoutOpen(true)}
>
  Proceed to Checkout
</button>
  </div>
)}
    </div>


    {isCheckoutOpen && (
  <div
    className="checkout-modal-overlay"
    onClick={() => setIsCheckoutOpen(false)}
  >
    <div
      className="checkout-modal"
      onClick={(event) => event.stopPropagation()}
    >
      <h2>Checkout</h2>
      <p>Complete your details to place your order.</p>

      {isOrderPlaced ? (
  <div className="order-success">
    <div className="success-icon">✓</div>

    <h3>Order Placed Successfully!</h3>

    <p>
      Thank you for shopping with ShopEase.
      Your order has been confirmed.
    </p>

    <h3>Total Paid: ${total.toFixed(2)}</h3>

    <button
      onClick={() => {
        setCart([]);
        setIsOrderPlaced(false);
        setIsCheckoutOpen(false);
        onClose();
      }}
    >
      Continue Shopping
    </button>
  </div>
) : (
  <form onSubmit={handlePlaceOrder}>
    <label>Full Name</label>
    <input
      type="text"
      placeholder="Enter your name"
      required
    />

    <label>Email Address</label>
    <input
      type="email"
      placeholder="Enter your email"
      required
    />

    <div className="checkout-total">
      Order Total: ${total.toFixed(2)}
    </div>

    <button type="submit">
      Place Order
    </button>
  </form>
)}
       
    </div>
  </div>
)}
  </div>
);

}

export default CartDrawer
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

/**
 * Shopping cart page. Lists every plant type in the cart with its thumbnail,
 * name, unit price, quantity controls, subtotal and a delete button.
 */
const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [checkoutMessage, setCheckoutMessage] = useState(false);

  // Total number of plants in the cart.
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Helper to safely parse costs whether provided as numbers (15) or strings ('$15')
  const parseCost = (cost) => {
    if (typeof cost === 'number') return cost;
    return parseFloat(String(cost).replace(/[^0-9.-]+/g, '')) || 0;
  };

  // Calculate total amount for all products in the cart.
  const calculateTotalAmount = () =>
    cart
      .reduce((total, item) => total + parseCost(item.cost) * item.quantity, 0)
      .toFixed(2);

  // Calculate the total cost for a single plant type (unit price x quantity).
  const calculateTotalCost = (item) =>
    (parseCost(item.cost) * item.quantity).toFixed(2);

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = () => {
    setCheckoutMessage(true);
    alert('Functionality to be added for future reference - Coming Soon!');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Dropping below 1 removes the plant from the cart.
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <main className="cart-container">
      <header className="cart-header">
        <h1 className="cart-title">Your Shopping Cart</h1>
        <div className="cart-summary">
          <div className="cart-summary__item">
            <span className="cart-summary__label">Total Plants</span>
            <span className="cart-summary__value" id="cart-total-items">
              {totalItems}
            </span>
          </div>
          <div className="cart-summary__item cart-summary__item--accent">
            <span className="cart-summary__label">Total Cart Amount</span>
            <span className="cart-summary__value" id="cart-total-amount">
              ${calculateTotalAmount()}
            </span>
          </div>
        </div>
      </header>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <span className="cart-empty__icon" aria-hidden="true">
            🪴
          </span>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven&apos;t added any plants yet.</p>
        </div>
      ) : (
        <ul className="cart-list">
          {cart.map((item) => (
            <li className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />

              <div className="cart-item-details">
                <h2 className="cart-item-name">{item.name}</h2>
                <p className="cart-item-cost">
                  Unit price: <strong>${parseCost(item.cost).toFixed(2)}</strong>
                </p>

                <div className="cart-item-quantity" aria-label={`Quantity of ${item.name}`}>
                  <button
                    id={`decrement-${slug(item.name)}`}
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    −
                  </button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button
                    id={`increment-${slug(item.name)}`}
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-side">
                <div className="cart-item-total">
                  <span>Total</span>
                  <strong>${calculateTotalCost(item)}</strong>
                </div>
                <button
                  id={`delete-${slug(item.name)}`}
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                    <path
                      d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="cart-actions">
        <button
          id="continue-shopping-button"
          className="btn btn-outline"
          onClick={handleContinueShopping}
        >
          ← Continue Shopping
        </button>
        <button
          id="checkout-button"
          className="btn btn-primary"
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>
      </div>

      {checkoutMessage && (
        <p className="checkout-message" role="status">
          🚧 Checkout is <strong>Coming Soon</strong> — thanks for your patience!
        </p>
      )}
    </main>
  );
};

export default CartItem;

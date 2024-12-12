import React, { useState, useEffect } from "react";

function CartPage() {
  const [cart, setCart] = useState([]);

  // Load cart items from local storage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Update item quantity
  const updateQuantity = (id, delta) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove item from cart
  const removeFromCart = id => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountedPrice = totalPrice * 0.9;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} className="border-b p-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p>${item.price}</p>
              </div>
              <div>
                <button onClick={() => updateQuantity(item.id, -1)} className="px-2">-</button>
                <span className="px-2">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="px-2">+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="bg-red-500 px-4 py-2 text-white rounded">
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4">
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <p>Discounted Price: ${discountedPrice.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;

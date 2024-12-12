import React, { useState } from "react";

function ProductCard({ product }) {
  const [isInCart, setIsInCart] = useState(false);

  const toggleCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (isInCart) {
      const updatedCart = cart.filter(item => item.id !== product.id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    setIsInCart(!isInCart);
  };

  return (
    <div className="border p-4 rounded shadow-sm">
      <img src={product.image} alt={product.title} className="h-32 mx-auto" />
      <h2 className="text-lg font-bold mt-2">{product.title}</h2>
      <p>${product.price}</p>
      <button
        onClick={toggleCart}
        className={`mt-2 px-4 py-2 rounded ${isInCart ? "bg-red-500" : "bg-blue-500"} text-white`}
      >
        {isInCart ? "Remove from Cart" : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;

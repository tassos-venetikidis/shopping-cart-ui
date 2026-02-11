import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState(getCartState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function getCartState() {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      return storedCart;
    } else {
      return [];
    }
  }

  function addToCart(product) {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) => {
          if (item.id === existing.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return { ...item };
          }
        });
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };

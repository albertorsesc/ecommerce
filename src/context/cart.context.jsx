import { useState, useEffect, createContext } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  items: [],
  addItem: () => {},
  cartCount: 0,
})

const addCartItem = (items, productToAdd) => {
  const existingCartItem = items.find(i => i.id === productToAdd.id);

  if (existingCartItem) {
    return items.map(
      item => item.id === productToAdd.id ? 
        { ...item, quantity: item.quantity + 1 } : 
        item
    ); 
  }

  return [...items, { ...productToAdd, quantity: 1 }];
};

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = items.reduce((total, item) => total + item.quantity, 0);
    setCartCount(newCartCount);
  }, [items]);

  const addItemToCart = (productToAdd) => {
    setItems(addCartItem(items, productToAdd));
  };

  const value = {isCartOpen, setIsCartOpen, addItemToCart, items, cartCount};

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}
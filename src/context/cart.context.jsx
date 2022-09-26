import { useState, useEffect, createContext } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  items: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
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

const removeCartItem = (items, cartItemToRemove) => {
  const existingCartItem = items.find(i => i.id === cartItemToRemove.id);

  if (existingCartItem.quantity === 1) {
    return items.filter(item => item.id !== cartItemToRemove.id);
  }

  return items.map(
    item => item.id === cartItemToRemove.id ? 
      { ...item, quantity: item.quantity - 1 } : 
      item
  ); 
};

const clearCartItem = (items, cartItemToClear) => items.filter(
  item => item.id !== cartItemToClear.id
);

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = items.reduce((total, item) => total + item.quantity, 0);

    setCartCount(newCartCount);
  }, [items]);

  useEffect(() => {
    const newCartTotal = items.reduce((total, item) => total + item.quantity * item.price, 0);

    setCartTotal(newCartTotal);
  }, [items]);

  const addItemToCart = (productToAdd) => {
    setItems(addCartItem(items, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setItems(removeCartItem(items, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToRemove) => {
    setItems(clearCartItem(items, cartItemToRemove));
  };

  const value = {
    isCartOpen, 
    setIsCartOpen, 
    addItemToCart, 
    removeItemFromCart,
    clearItemFromCart,
    items, 
    cartCount,
    cartTotal,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}
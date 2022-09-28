import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

export const CartContext = createContext({
  setIsCartOpen: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
})

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

const INITIAL_STATE = {
  isCartOpen: false,
  items: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload} = action;

  switch(type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      }
    default:
      throw new Error(`unhandled type of ${type} in cartReducer`);
  }
};

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

  const [{ items, isCartOpen, cartCount, cartTotal }, dispatch] = useReducer(
    cartReducer, INITIAL_STATE
  );

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, item) => total + item.quantity, 0);
    const newCartTotal = newCartItems.reduce((total, item) => total + item.quantity * item.price, 0);

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { 
        items: newCartItems, 
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(items, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(items, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToRemove) => {
    const newCartItems = clearCartItem(items, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(
      createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
    );
  }

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
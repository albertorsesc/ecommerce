
import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import './cart-dropdown.styles.scss';
import Button from '../button/button.component';

import CartItem from '../cart-item/cart-item.component';

const CartDropdown = () => {
  const { items } = useContext(CartContext);

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {items.map(item => <CartItem cartItem={item} key={item.id} />)}
      </div>

      <Button>Go to Checkout</Button>
    </div>
  );
};

export default CartDropdown;
import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import './navigation.styles.scss';

import { UserContext } from '../../context/user.context';
import { CartContext, CartProvider } from '../../context/cart.context';

import { signOutUser } from '../../utils/firebase/firebase.utils';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <div className='navigation'>
        <Link to='/' className='logo-container'>
          <CrownLogo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <Link to='/shop' className='nav-link'>
            Shop
          </Link>
          {
            currentUser ? (
              <span onClick={signOutUser} className='nav-link'>
                Sign out
              </span>
            ) :
            (
              <Link to='/auth' className='nav-link'>
                Sign in
              </Link>
            )
          }
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>

      <Outlet />
    </Fragment>
  );
}

export default Navigation;

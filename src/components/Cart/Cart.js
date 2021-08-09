import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as vars from '../../shared/globalVars';
import { uiActions } from '../../store/ui-slice';
import CartItemsList from './CartItemsList';
import Button from '../UI/Button';
import styles from './Cart.module.scss';
import { useEffect } from 'react';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { items, totalAmount } = cart;
  const history = useHistory();
  const dispatch = useDispatch();

  const closeCartHanlder = () => dispatch(uiActions.modalClose());
  const submitCartHandler = () => {
    history.push(vars.CHECKOUT_MAIN);
    dispatch(uiActions.modalClose());
  };

  useEffect(() => {
    localStorage.setItem(vars.USER_CART, JSON.stringify(cart));
  }, [cart]);

  return (
    <div className={styles.cartContent}>
      <h1>You Cart</h1>
      {items.length === 0 && <p className="lead">Your cart is empty</p>}
      {items.length > 0 && <CartItemsList items={items} amount={totalAmount} />}
      <div className={styles.btnWrapper}>
        <Button clicked={closeCartHanlder}>Continue Shopping</Button>
        {items.length > 0 && (
          <Button btnStyle={vars.BTN_DARK} clicked={submitCartHandler}>
            Checkout and Order
          </Button>
        )}
      </div>
    </div>
  );
};
export default Cart;

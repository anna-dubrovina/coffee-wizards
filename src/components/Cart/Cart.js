import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { uiActions } from '../../store/ui-slice';
import Button from '../UI/Button';
import styles from './Cart.module.scss';
import CartItemsList from './CartItemsList';

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  
  const history = useHistory();
  const dispatch = useDispatch();
  const closeCartHanlder = () => dispatch(uiActions.close());

  const submitCartHandler = () => {
    history.push('/checkout');
    dispatch(uiActions.modalClose());
  
  };

  return (
    <div className={styles.cartContent}>
      <h1>You Cart</h1>

      {items.length === 0 && <p className="lead">Your cart is empty</p>}
      {items.length > 0 && <CartItemsList items={items} />}

      <div className={styles.btnWrapper}>
        <Button clicked={closeCartHanlder}>Continue Shopping</Button>
        {items.length > 0 && (
          <Button btnStyle="btnDark" clicked={submitCartHandler}>
            Checkout and Order
          </Button>
        )}
      </div>
    </div>
  );
};
export default Cart;

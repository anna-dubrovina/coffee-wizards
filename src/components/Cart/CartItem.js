import Card from '../UI/Card';
import Button from '../UI/Button';
import deleteIcon from '../../assets/icons/trash.svg';
import styles from './CartItem.module.scss';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';

const CartItem = (props) => {
  const { title, price, img, quantity, id, category, size } = props.product;

  console.log(id);

  const dispatch = useDispatch();

  const addItemHandler = () => {
    dispatch(cartActions.addItem({ id, price }));
  };
  const removeItemHandler = () => {
    dispatch(cartActions.removeItem(id));
  };
  const deleteItemHandler = () => {
    dispatch(cartActions.deleteItem({ id, quantity }));
  };

  return (
    <li className={styles.cartItem}>
      <Card>
        <img src={img} alt="product" />
        <div className={styles.itemSummary}>
          <h3>{title}</h3>
          <p>{category}</p>
          <h5>{size}</h5>
          <div className={styles.cartControls}>
            <Button clicked={removeItemHandler}> &ndash; </Button>
            <span>{quantity}</span>
            <Button clicked={addItemHandler}>+</Button>
            <img src={deleteIcon} alt="delete" onClick={deleteItemHandler} />
          </div>
        </div>
        <p>$ {price.toFixed(2)}</p>
      </Card>
    </li>
  );
};
export default CartItem;

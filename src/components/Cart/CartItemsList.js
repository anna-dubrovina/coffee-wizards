import CartItem from './CartItem';
import styles from './CartItemsList.module.scss';

const CartItemsList = (props) => {
  const cartItems = props.items.map((item) => {
    return <CartItem key={item.id} product={item} />;
  });

  return (
    <>
      <ul className={styles.cartItemsList}>{cartItems}</ul>
      <h2>Total: $ {props.amount} </h2>
    </>
  );
};

export default CartItemsList;

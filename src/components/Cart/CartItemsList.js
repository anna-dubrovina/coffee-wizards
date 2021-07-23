import CartItem from './CartItem';
import styles from './CartItemsList.module.scss';

const CartItemsList = (props) => {
  const cartItems = props.items.map((item) => {
    return <CartItem key={item.id} product={item} />;
  });
  const totalPrice = props.items.reduce((prevValue, curValue) => {
    return prevValue + curValue.totalItemPrice;
  }, 0);

  return (
    <>
      <ul className={styles.cartItemsList}>{cartItems}</ul>
      <h2>Total: $ {totalPrice.toFixed(2)} </h2>
    </>
  );
};

export default CartItemsList;

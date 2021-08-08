import ShortContacts from '../Layout/ShortContacts';
import Logo from '../UI/Logo';
import styles from './CheckoutHeader.module.scss';

const CheckoutHeader = () => {
  return (
    <header className={styles.checkoutHeader + ' container'}>
      <Logo />
      <h1> Checkout</h1>
      <ShortContacts dark />
    </header>
  );
};

export default CheckoutHeader;

import Contacts from '../Layout/Contacts';
import Logo from '../UI/Logo';
import styles from './CheckoutHeader.module.scss';

const CheckoutHeader = () => {
  return (
    <header className={styles.checkoutHeader + ' container'}>
      <Logo />
      <h1> Checkout</h1>
      <Contacts dark />
    </header>
  );
};

export default CheckoutHeader;

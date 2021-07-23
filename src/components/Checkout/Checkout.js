import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import Auth from '../Profile/Auth';
import CartItemsList from '../Cart/CartItemsList';
import Section from '../Layout/Section';
import Card from '../UI/Card';
import styles from './Checkout.module.scss';

const Checkout = () => {
  const { items } = useSelector((state) => state.cart);
  const { isAuth, userId } = useSelector((state) => state.profile);
  const [checkoutType, setCheckoutType] = useState('new');
  const history = useHistory();

  const cancelCheckoutHandler = () => history.goBack();
  const showLoginFormHandler = () => setCheckoutType('login');
  const showNewCustomerFormHandler = () => setCheckoutType('new');

  useEffect(
    () => (isAuth ? setCheckoutType('regular') : setCheckoutType('new')),
    [isAuth]
  );

  return (
    <Section className={styles.checkout}>
      <Card className={styles.checkoutForm}>
        <h2>
          <span
            onClick={showNewCustomerFormHandler}
            className={checkoutType === 'login' ? styles.formType : ''}
          >
            New Customer
          </span>
          <span
            onClick={showLoginFormHandler}
            className={checkoutType === 'new' ? styles.formType : ''}
          >
            Regular Customer
          </span>
        </h2>
        {checkoutType === 'login' ? (
          <Auth />
        ) : (
          <CheckoutForm items={items} userId={userId} />
        )}
      </Card>
      <Card className={styles.cartSummary}>
        <div className={styles.cartTitle}>
          <h2>Your Order</h2>
          <span className={styles.cancel} onClick={cancelCheckoutHandler}>
            Cancel Checkout
          </span>
        </div>
        <CartItemsList items={items} />
      </Card>
    </Section>
  );
};

export default Checkout;

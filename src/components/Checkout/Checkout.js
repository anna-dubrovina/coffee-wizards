import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Auth from '../Profile/Auth';
import CartItemsList from '../Cart/CartItemsList';
import CheckoutForm from './CheckoutForm';
import CheckoutSuccess from './CheckoutSuccess';
import Section from '../Layout/Section';
import Card from '../UI/Card';
import styles from './Checkout.module.scss';

const Checkout = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const { isAuth, userId } = useSelector((state) => state.profile);
  const [isNewUser, setCheckoutType] = useState(true);
  const [checkoutSuccess, setCheckoutSuccess] = useState({
    isSuccess: false,
    orderId: null,
  });
  const history = useHistory();

  const cancelCheckoutHandler = () => history.goBack();
  const showLoginFormHandler = () => setCheckoutType(false);
  const showNewCustomerFormHandler = () => setCheckoutType(true);

  const getCheckoutSuccess = (orderId) => {
    setCheckoutSuccess((curState) => {
      const updatedState = { ...curState };
      updatedState.isSuccess = true;
      updatedState.orderId = orderId;
      return updatedState;
    });
  };

  return checkoutSuccess.isSuccess ? (
    <CheckoutSuccess orderId={checkoutSuccess.orderId} />
  ) : (
    <Section className={styles.checkout}>
      <Card className={styles.checkoutForm}>
        {!isAuth && (
          <h2>
            <span
              onClick={showNewCustomerFormHandler}
              className={!isNewUser ? styles.formType : ''}
            >
              New Customer
            </span>
            <span
              onClick={showLoginFormHandler}
              className={isNewUser ? styles.formType : ''}
            >
              I Have an Account
            </span>
          </h2>
        )}
        {!isNewUser & !isAuth ? (
          <Auth />
        ) : (
          <CheckoutForm
            items={items}
            userId={userId}
            auth={isAuth}
            amount={totalAmount}
            getCheckoutSuccess={getCheckoutSuccess}
          />
        )}
      </Card>
      <Card className={styles.cartSummary}>
        <div className={styles.cartTitle}>
          <h2>Your Order</h2>
          <span className={styles.cancel} onClick={cancelCheckoutHandler}>
            Cancel Checkout
          </span>
        </div>
        <CartItemsList items={items} amount={totalAmount} />
      </Card>
    </Section>
  );
};

export default Checkout;

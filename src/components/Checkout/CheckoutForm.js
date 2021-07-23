import { useState } from 'react';
import PersonalDataForm from './PersonalDataForm';
import DeliveryInfoForm from './DeliveryInfoForm';
import styles from './CheckoutForm.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../UI/Button';
import { login } from '../../store/profile-actions';
import { checkoutActions } from '../../store/checkout-slice';
import { cartActions } from '../../store/cart-slice';
import { httpRequest } from '../../shared/httpRequest';

const CheckoutForm = (props) => {
  const [checkoutStep, setCheckoutStep] = useState(1);
  const { formValues, formIsValid } = useSelector((state) => state.checkout);
  const dispatch = useDispatch();

  const checkoutStepHandler = (step) => {
    if (step === checkoutStep) {
      return;
    }
    if (checkoutStep === 2) {
      setCheckoutStep(1);
    }
    if (formIsValid && checkoutStep === 1) {
      setCheckoutStep(2);
    } else {
      return;
    }
  };

  const sendDataHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    if (formValues.password !== '') {
      const url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
      dispatch(login(url, formValues.email, formValues.password));
    }

    const deliveryInfo = { ...formValues };
    delete deliveryInfo.password;

    httpRequest(
      {
        url: '/orders.json',
        method: 'POST',
        body: {
          order: props.items,
          userId: props.userId,
          deliveryInfo,
        },
      },
      () => {
        dispatch(checkoutActions.clearForm());
        dispatch(cartActions.clearCart());
      }
    );
  };

  return (
    <form onSubmit={sendDataHandler}>
      <div className={styles.checkoutSteps}>
        <h4 onClick={checkoutStepHandler.bind(null, 1)}>
          <span className={checkoutStep === 1 ? styles.currentStep : ''}>
            1
          </span>
          Personal Data
        </h4>
        <h4 onClick={checkoutStepHandler.bind(null, 2)}>
          <span className={checkoutStep === 2 ? styles.currentStep : ''}>
            2
          </span>
          Delivery Info
        </h4>
      </div>
      {checkoutStep === 1 && <PersonalDataForm goNext={checkoutStepHandler} />}
      {checkoutStep === 2 && (
        <DeliveryInfoForm>
          <div className={styles.orderBtn}>
            <Button submit btnStyle="btnDark">
              Confirm Order
            </Button>
          </div>
        </DeliveryInfoForm>
      )}
    </form>
  );
};
export default CheckoutForm;

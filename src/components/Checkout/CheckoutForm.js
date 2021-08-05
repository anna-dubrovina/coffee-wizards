import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { cartActions } from '../../store/cart-slice';
import { uiActions } from '../../store/ui-slice';
import { fetchUserData, login } from '../../store/profile-actions';
import { httpRequest } from '../../shared/httpRequest';
import useInput from '../../hooks/useInput';
import Select from '../UI/Select';
import Input from '../UI/Input';
import Loader from '../UI/Loader';
import Button from '../UI/Button';
import styles from './CheckoutForm.module.scss';
import Checkbox from '../UI/Checkbox';

const getOrderId = (name) => {
  const charArray = name
    .replaceAll(/[0-9]/g, '')
    .substring(4, 10)
    .toLowerCase()
    .split('');

  const digitArray = charArray.map((letter) => {
    return letter.charCodeAt(0) - 97;
  });
  const orderId = digitArray.join('').substring(0, 6);
  return orderId;
};

const CheckoutForm = (props) => {
  const [register, setRegister] = useState(true);
  const [deliveryMethod, setDeliveryMethod] = useState('courier');
  const [deliveryTime, setDeliveryTime] = useState('tomorrow');
  const [paymentMethod, setPaymentMethod] = useState('card transfer');
  const { userContacts } = useSelector((state) => state.profile);
  const { userAddresses } = useSelector((state) => state.profile);
  const { isLoading } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const history = useHistory();
  let mainAddress = {};
  if (userAddresses.length > 0) {
    mainAddress = userAddresses.filter((item) => item.isMain === true)[0];
  }

  const {
    value: enteredName,
    invalid: invalidName,
    error: nameError,
    changeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
  } = useInput('name', userContacts.name);

  const {
    value: enteredLastname,
    invalid: invalidLastname,
    error: lastnameError,
    changeHandler: lastnameChangeHandler,
    blurHandler: lastnameBlurHandler,
  } = useInput('name', userContacts.lastName);

  const {
    value: enteredEmail,
    invalid: invalidEmail,
    error: emailError,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
  } = useInput('email', userContacts.email);

  const {
    value: enteredPhone,
    invalid: invalidPhone,
    error: phoneError,
    changeHandler: phoneChangeHandler,
    blurHandler: phoneBlurHandler,
  } = useInput('phone', userContacts.phone);

  const {
    value: enteredPassword,
    invalid: invalidPassword,
    error: passwordError,
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
  } = useInput('password');

  const {
    value: enteredCity,
    invalid: invalidCity,
    error: cityError,
    changeHandler: cityChangeHandler,
    blurHandler: cityBlurHandler,
  } = useInput('city', mainAddress.city);
  const {
    value: enteredPostalCode,
    invalid: invalidPostalCode,
    error: postalCodeError,
    changeHandler: postalCodeChangeHandler,
    blurHandler: postalCodeBlurHandler,
  } = useInput('postalCode', mainAddress.postalCode);
  const {
    value: enteredAddress,
    invalid: invalidAddress,
    error: addressError,
    changeHandler: addressChangeHandler,
    blurHandler: addressBlurHandler,
  } = useInput('address', mainAddress.address);

  useEffect(() => {
    if (props.auth) {
      dispatch(fetchUserData(props.userId, 'contacts'));
      dispatch(fetchUserData(props.userId, 'addresses'));
      setDeliveryMethod(mainAddress.deliveryMethod);
    }
  }, [dispatch, props.userId, props.auth, mainAddress.deliveryMethod]);

  const registerChangeHanlder = () => setRegister((curState) => !curState);
  const getDeliveryMethod = (value) => setDeliveryMethod(value);
  const getPaymentMethod = (value) => setPaymentMethod(value);
  const getDeliveryTime = (value) => setDeliveryTime(value);

  const checkFormValidity = () => {
    if (
      invalidName ||
      enteredName.trim() === '' ||
      invalidLastname ||
      enteredLastname.trim() === '' ||
      invalidPhone ||
      enteredPhone.trim() === '' ||
      invalidEmail ||
      enteredEmail.trim() === '' ||
      invalidPassword & !props.auth & register ||
      (enteredPassword.trim() === '') & !props.auth & register ||
      invalidCity ||
      enteredCity.trim() === '' ||
      invalidAddress & (deliveryMethod === 'courier') ||
      (enteredAddress.trim() === '') & (deliveryMethod === 'courier') ||
      invalidPostalCode & (deliveryMethod === 'post office') ||
      enteredPostalCode.trim() & ((deliveryMethod === 'post office') === '')
    ) {
      return false;
    }
    return true;
  };

  const sendDataHandler = (e) => {
    e.preventDefault();
    const formIsValid = checkFormValidity();

    if (!formIsValid) {
      dispatch(
        uiActions.setError('please fill all inputs with correct information')
      );
      return;
    }
    if (props.items.length === 0) {
      dispatch(
        uiActions.setError(
          'your cart is empty. Please come back to store and add needed items again'
        )
      );
      return;
    }

    if (!props.auth & register) {
      const url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
      dispatch(login(url, enteredEmail, enteredPassword));
    }
    const deliveryInfo = {
      address: enteredAddress,
      city: enteredCity,
      date: new Date().toLocaleDateString(),
      deliveryMethod,
      deliveryTime,
      email: enteredEmail,
      lastName: enteredLastname,
      name: enteredName,
      paymentMethod,
      phone: enteredPhone,
      postalCode: enteredPostalCode,
    };

    httpRequest(
      {
        url: '/orders.json',
        method: 'POST',
        body: {
          amount: props.amount,
          products: props.items,
          userId: props.userId,
          deliveryInfo,
        },
      },
      (resData) => {
        dispatch(cartActions.clearCart());
        const orderId = getOrderId(resData.name);

        httpRequest(
          {
            url: `/orders/${resData.name}.json`,
            method: 'PATCH',
            body: { orderId },
          },
          () => {
            props.getCheckoutSuccess(orderId);
          }
        );
      }
    );
  };

  let conditionalInput;

  switch (deliveryMethod) {
    case 'courier':
      conditionalInput = (
        <Input
          type="text"
          id="address"
          label="Delivery Address"
          onChange={addressChangeHandler}
          onBlur={addressBlurHandler}
          errorMsg={addressError}
          invalid={invalidAddress}
          value={enteredAddress}
        />
      );
      break;
    case 'post office':
      conditionalInput = (
        <Input
          type="text"
          id="postalCode"
          label="Postal Code"
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeBlurHandler}
          errorMsg={postalCodeError}
          invalid={invalidPostalCode}
          value={enteredPostalCode}
        />
      );
      break;

    default:
      conditionalInput = <div />;
      break;
  }

  return isLoading ? (
    <Loader />
  ) : (
    <form onSubmit={sendDataHandler} className={styles.checkoutForm}>
      <h4>
        <span>1</span>
        Personal Data
      </h4>
      <div className={styles.formControls}>
        <Input
          type="text"
          id="first-name"
          label="First Name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          errorMsg={nameError}
          invalid={invalidName}
          value={enteredName}
        />
        <Input
          type="text"
          id="last-name"
          label="Last Name"
          onChange={lastnameChangeHandler}
          onBlur={lastnameBlurHandler}
          errorMsg={lastnameError}
          invalid={invalidLastname}
          value={enteredLastname}
        />
        <Input
          type="text"
          id="phone"
          label="Phone Number"
          onChange={phoneChangeHandler}
          onBlur={phoneBlurHandler}
          errorMsg={phoneError}
          invalid={invalidPhone}
          value={enteredPhone}
        />
        <Input
          type="email"
          id="email"
          label="Email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          errorMsg={emailError}
          invalid={invalidEmail}
          value={enteredEmail}
        />
        {!props.auth && (
          <>
            <Input
              type="password"
              id="password"
              label="Password"
              disabled={!register}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              errorMsg={passwordError}
              invalid={invalidPassword}
              value={enteredPassword}
            />
            <Checkbox
              id="register"
              onChange={registerChangeHanlder}
              label="Don't register me"
            />
          </>
        )}
      </div>
      <h4>
        <span>2</span>
        Delivery Info
      </h4>
      <div className={styles.formControls}>
        <Input
          type="text"
          id="city"
          label="City"
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
          errorMsg={cityError}
          invalid={invalidCity}
          value={enteredCity}
        />
        <Select
          id="deliveryTime"
          options={['tomorrow', 'this week', 'on weekends']}
          label="Delivery Time"
          getValue={getDeliveryTime}
          value={deliveryTime}
        />
        <Select
          id="deliveryMethod"
          options={['courier', 'post office']}
          label="Delivery Method"
          getValue={getDeliveryMethod}
          value={deliveryMethod}
        />
        <Select
          id="paymentMethod"
          options={['card transfer', 'cash on receipt']}
          label="Payment Method"
          getValue={getPaymentMethod}
          value={paymentMethod}
        />
        {conditionalInput}
      </div>

      <Button submit btnStyle="btnDark">
        Confirm Order
      </Button>
    </form>
  );
};
export default CheckoutForm;

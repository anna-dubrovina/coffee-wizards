import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutActions } from '../../store/checkout-slice';
import Input from '../UI/Input';
import Select from '../UI/Select';
import styles from './CheckoutForm.module.scss';
import useInput from '../../hooks/useInput';

const DeliveryInfoForm = (props) => {
  const [deliveryMethod, setDeliveryMethod] = useState('courier');
  const { formValues } = useSelector((state) => state.checkout);

  const {
    value: enteredCity,
    invalid: invalidCity,
    error: cityError,
    changeHandler: cityChangeHandler,
    blurHandler: cityBlurHandler,
  } = useInput('city');
  const {
    value: enteredPostalCode,
    invalid: invalidPostalCode,
    error: postalCodeError,
    changeHandler: postalCodeChangeHandler,
    blurHandler: postalCodeBlurHandler,
  } = useInput('postalCode');
  const {
    value: enteredAddress,
    invalid: invalidAddress,
    error: addressError,
    changeHandler: addressChangeHandler,
    blurHandler: addressBlurHandler,
  } = useInput('address');

  const dispatch = useDispatch();

  const getDeliveryMethod = (value) => {
    setDeliveryMethod(value);
  };

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      enteredCity.trim() !== '' &&
        dispatch(checkoutActions.setFormValues({ city: enteredCity }));
      enteredAddress.trim() !== '' &&
        dispatch(checkoutActions.setFormValues({ address: enteredAddress }));
      enteredPostalCode.trim() !== '' &&
        dispatch(
          checkoutActions.setFormValues({ postalCode: enteredPostalCode })
        );
    }, 1000);
    return () => clearTimeout(timer);
  }, [dispatch, enteredCity, enteredAddress, enteredPostalCode]);

  useEffect(() => {
    if (
      invalidCity ||
      formValues.city.trim() === '' ||
      invalidAddress ||
      (formValues.address.trim() === '') &
        (formValues.deliveryMethod === 'courier') ||
      invalidPostalCode ||
      (formValues.postalCode.trim() === '') &
        (formValues.deliveryMethod === 'post office')
    ) {
      dispatch(checkoutActions.setValidity(false));
    } else {
      dispatch(checkoutActions.setValidity(true));
    }
  }, [invalidCity, invalidAddress, invalidPostalCode, formValues, dispatch]);

  let conditionalInput = <div />;

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
          value={formValues.postalCode}
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
          value={formValues.postalCode}
        />
      );
      break;

    default:
      conditionalInput = <div />;
      break;
  }

  return (
    <div className={styles.formControls}>
      <Input
        type="text"
        id="city"
        label="City"
        onChange={cityChangeHandler}
        onBlur={cityBlurHandler}
        errorMsg={cityError}
        invalid={invalidCity}
        value={formValues.city}
      />
      <Select
        id="deliveryTime"
        options={['tomorrow', 'this week', 'on weekends']}
        checkout
        label="Delivery Time"
      />
      <Select
        id="deliveryMethod"
        options={['courier', 'post office']}
        label="Delivery Method"
        checkout
        getValue={getDeliveryMethod}
      />
      <Select
        id="paymentMethod"
        checkout
        options={['card transfer', 'cash on receipt']}
        label="Payment Method"
      />
      {conditionalInput}
      {props.children}
    </div>
  );
};
export default DeliveryInfoForm;

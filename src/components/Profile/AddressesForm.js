import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFirebaseKey } from '../../shared/getFirebaseKey';
import { httpRequest } from '../../shared/httpRequest';
import { fetchUserData } from '../../store/profile-actions';
import { uiActions } from '../../store/ui-slice';
import useInput from '../../hooks/useInput';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Select from '../UI/Select';
import styles from './Addresses.module.scss';

const AddressesForm = (props) => {
  const [deliveryMethod, setDeliveryMethod] = useState('courier');
  const dispatch = useDispatch();
  const updatedAddresses = [...props.addresses];

  const {
    value: enteredCity,
    invalid: invalidCity,
    error: cityError,
    changeHandler: cityChangeHandler,
    blurHandler: cityBlurHandler,
    reset: resetCity,
  } = useInput('city', props.editData.city);
  const {
    value: enteredPostalCode,
    invalid: invalidPostalCode,
    error: postalCodeError,
    changeHandler: postalCodeChangeHandler,
    blurHandler: postalCodeBlurHandler,
    reset: resetPostalCode,
  } = useInput('postalCode', props.editData.postalCode);
  const {
    value: enteredAddress,
    invalid: invalidAddress,
    error: addressError,
    changeHandler: addressChangeHandler,
    blurHandler: addressBlurHandler,
    reset: resetAddress,
  } = useInput('address', props.editData.address);

  useEffect(() => {
    if (props.mode === 'edit') {
      setDeliveryMethod(props.editData.deliveryMethod);
    }
  }, [props.mode, props.editData]);

  const getDeliveryMethod = (value) => {
    setDeliveryMethod(value);
  };

  const resetInputs = () => {
    resetAddress();
    resetCity();
    resetPostalCode();
  };

  const cancelEditMode = () => {
    props.changeMode('add');
    resetInputs();
  };

  const checkFormValidity = () => {
    if (
      invalidCity ||
      enteredCity.trim() === '' ||
      invalidAddress ||
      enteredAddress.trim() === '' ||
      invalidPostalCode ||
      enteredPostalCode.trim() === ''
    ) {
      return false;
    }
    return true;
  };

  const transfromData = () => {
    switch (props.mode) {
      case 'add':
        const newAddress = {
          deliveryMethod,
          city: enteredCity,
          address: enteredAddress,
          postalCode: enteredPostalCode,
        };
        if (updatedAddresses.length === 0) {
          newAddress.id = 'address0';
          newAddress.isMain = true;
        } else {
          for (let i = 1; i <= updatedAddresses.length; i++) {
            newAddress.id = `address${i}`;
          }
          newAddress.isMain = false;
        }
        updatedAddresses.push(newAddress);

        break;
      case 'edit':
        const index = updatedAddresses.findIndex(
          (item) => item.id === props.editData.id
        );
        const updatedAddress = {
          id: props.editData.id,
          isMain: props.editData.isMain,
          deliveryMethod,
          city: enteredCity,
          address: enteredAddress,
          postalCode: enteredPostalCode,
        };
        updatedAddresses.splice(index, 1, updatedAddress);
        break;

      default:
        break;
    }
    return updatedAddresses;
  };

  const submitAddress = (key) => {
    props.changeLoaderPlace('underForm');
    const formIsValid = checkFormValidity();

    if (!formIsValid) {
      dispatch(
        uiActions.setError('please fill all inputs with correct information')
      );
      return;
    }

    if ((updatedAddresses.length >= 5) & (props.mode === 'add')) {
      dispatch(
        uiActions.setError(
          'too many saved addresses. You can save no more than 5 addresses. Please delete or edit unnecessary address'
        )
      );
      return;
    }

    const body = transfromData();

    httpRequest(
      { url: `/users/${key}/addresses.json`, method: 'PUT', body },
      () => {
        dispatch(fetchUserData(props.userId, 'addresses'));
        cancelEditMode();
      }
    );
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    getFirebaseKey(props.userId, submitAddress);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <Select
        id="deliveryMethod"
        options={['courier', 'post office']}
        label="Delivery Method"
        getValue={getDeliveryMethod}
        value={deliveryMethod}
      />
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
      {props.mode === 'add' && (
        <Button btnStyle="btnDark" submit>
          Save
        </Button>
      )}
      {props.mode === 'edit' && (
        <div className={styles.btnWrapper}>
          <Button clicked={cancelEditMode}>Back</Button>
          <Button btnStyle="btnDark" submit>
            Confirm
          </Button>
        </div>
      )}
    </form>
  );
};
export default AddressesForm;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutActions } from '../../store/checkout-slice';
import useInput from '../../hooks/useInput';

import Input from '../UI/Input';
import styles from './CheckoutForm.module.scss';

const PersonalDataForm = (props) => {
  const { formValues } = useSelector((state) => state.checkout);
  const dispatch = useDispatch();

  const {
    value: enteredName,
    invalid: invalidName,
    error: nameError,
    changeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
  } = useInput('name');

  const {
    value: enteredLastname,
    invalid: invalidLastname,
    error: lastnameError,
    changeHandler: lastnameChangeHandler,
    blurHandler: lastnameBlurHandler,
  } = useInput('name');

  const {
    value: enteredEmail,
    invalid: invalidEmail,
    error: emailError,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
  } = useInput('email');

  const {
    value: enteredPhone,
    invalid: invalidPhone,
    error: phoneError,
    changeHandler: phoneChangeHandler,
    blurHandler: phoneBlurHandler,
  } = useInput('phone');

  const {
    value: enteredPassword,
    invalid: invalidPassword,
    error: passwordError,
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
  } = useInput('password');

  const [register, setRegister] = useState(true);
  const registerChangeHanlder = () => setRegister((curState) => !curState);

  const nextStepHandler = () => {
    props.goNext();
  };

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      enteredName.trim() !== '' &&
        dispatch(checkoutActions.setFormValues({ name: enteredName }));
      enteredLastname.trim() !== '' &&
        dispatch(checkoutActions.setFormValues({ lastName: enteredLastname }));
      enteredPhone.trim() !== '' &&
        dispatch(checkoutActions.setFormValues({ phone: enteredPhone }));
      enteredEmail.trim() !== '' &&
        dispatch(checkoutActions.setFormValues({ email: enteredEmail }));
      enteredPassword.trim() !== '' &&
        dispatch(checkoutActions.setFormValues({ password: enteredPassword }));
    }, 1000);
    return () => clearTimeout(timer);
  }, [
    dispatch,
    enteredPhone,
    enteredEmail,
    enteredName,
    enteredLastname,
    enteredPassword,
  ]);

  useEffect(() => {
    if (
      invalidName ||
      formValues.name.trim() === '' ||
      invalidLastname ||
      formValues.lastName.trim() === '' ||
      invalidEmail ||
      formValues.email.trim() === '' ||
      invalidPhone ||
      formValues.phone.trim() === '' ||
      invalidPassword & register ||
      (formValues.password.trim() === '') & register
    ) {
      dispatch(checkoutActions.setValidity(false));
    } else {
      dispatch(checkoutActions.setValidity(true));
    }
  }, [
    invalidName,
    invalidEmail,
    invalidLastname,
    invalidPassword,
    invalidPhone,
    formValues,
    register,
    dispatch,
  ]);

  return (
    <div className={styles.formControls}>
      <Input
        type="text"
        id="first-name"
        label="First Name"
        onChange={nameChangeHandler}
        onBlur={nameBlurHandler}
        errorMsg={nameError}
        invalid={invalidName}
        value={formValues.name}
      />
      <Input
        type="text"
        id="last-name"
        label="Last Name"
        onChange={lastnameChangeHandler}
        onBlur={lastnameBlurHandler}
        errorMsg={lastnameError}
        invalid={invalidLastname}
        value={formValues.lastName}
      />
      <Input
        type="text"
        id="phone"
        label="Phone Number"
        onChange={phoneChangeHandler}
        onBlur={phoneBlurHandler}
        errorMsg={phoneError}
        invalid={invalidPhone}
        value={formValues.phone}
      />
      <Input
        type="email"
        id="email"
        label="Email"
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        errorMsg={emailError}
        invalid={invalidEmail}
        value={formValues.email}
      />
      {register ? (
        <Input
          type="password"
          id="password"
          label="Password"
          disabled={!register}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          errorMsg={passwordError}
          invalid={invalidPassword}
          value={formValues.password}
        />
      ) : (
        <div />
      )}
      <div />
      <div className={styles.checkbox}>
        <input type="checkbox" id="register" onChange={registerChangeHanlder} />
        <label htmlFor="register">Don't register me</label>
      </div>
      <div onClick={nextStepHandler} className={styles.nextBtn}>
        Next
      </div>
    </div>
  );
};
export default PersonalDataForm;

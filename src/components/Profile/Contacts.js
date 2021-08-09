import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../store/profile-actions';
import { getFirebaseKey } from '../../shared/getFirebaseKey';
import { authHttpRequest, httpRequest } from '../../shared/httpRequest';
import { uiActions } from '../../store/ui-slice';
import * as vars from '../../shared/globalVars';
import useInput from '../../hooks/useInput';
import FormSuccess from '../UI/FormSuccess';
import Input from '../UI/Input';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Loader from '../UI/Loader';
import styles from './Contacts.module.scss';

const PASSWORD = 'password form',
  CONTACTS = 'contacts form';

const Contacts = () => {
  const userId = useSelector((state) => state.profile.userId);
  const { name, lastName, email, phone } = useSelector(
    (state) => state.profile.userContacts
  );
  const isLoading = useSelector((state) => state.ui.isLoading);
  const [loaderPlace, setLoaderPlace] = useState('');
  const [contactsFormSuccess, setContactsFormSuccess] = useState(false);
  const [passwordFormSuccess, setPasswordFormSuccess] = useState(false);
  const dispatch = useDispatch();

  const {
    value: enteredName,
    invalid: invalidName,
    error: nameError,
    changeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
  } = useInput(vars.NAME_INPUT, name);

  const {
    value: enteredLastname,
    invalid: invalidLastname,
    error: lastnameError,
    changeHandler: lastnameChangeHandler,
    blurHandler: lastnameBlurHandler,
  } = useInput(vars.NAME_INPUT, lastName);

  const {
    value: enteredEmail,
    invalid: invalidEmail,
    error: emailError,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
  } = useInput(vars.EMAIL_INPUT, email);

  const {
    value: enteredPhone,
    invalid: invalidPhone,
    error: phoneError,
    changeHandler: phoneChangeHandler,
    blurHandler: phoneBlurHandler,
  } = useInput(vars.PHONE_INPUT, phone);

  const {
    value: oldPassword,
    invalid: invalidOldPassword,
    error: oldPasswordError,
    changeHandler: oldPasswordChangeHandler,
    blurHandler: oldPasswordBlurHandler,
    reset: resetOldPassword,
  } = useInput(vars.PASSWORD_INPUT);
  const {
    value: newPassword,
    invalid: invalidNewPassword,
    error: newPasswordError,
    changeHandler: newPasswordChangeHandler,
    blurHandler: newPasswordBlurHandler,
    reset: resetNewPassword,
  } = useInput(vars.PASSWORD_INPUT);

  const {
    value: confirmPassword,
    invalid: invalidConfirmPassword,
    error: confirmPasswordError,
    changeHandler: confirmPasswordChangeHandler,
    blurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPassword,
  } = useInput(vars.PASSWORD_INPUT);

  useEffect(() => {
    dispatch(fetchUserData(userId, vars.USER_CONTACTS));
  }, [dispatch, userId]);

  const changePasswordSubmitHandler = (e) => {
    setLoaderPlace(PASSWORD);
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      dispatch(
        uiActions.setError(
          'to apply a new password, enter the correct confirmation'
        )
      );
      return;
    }
    dispatch(uiActions.setIsLoading(true));
    const token = localStorage.getItem(vars.TOKEN);
    authHttpRequest(
      {
        url: 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=',
        method: 'POST',
        body: {
          idToken: token,
          password: confirmPassword,
          returnSecureToken: false,
        },
      },
      () => {
        setPasswordFormSuccess(true);
        resetOldPassword();
        resetNewPassword();
        resetConfirmPassword();
      }
    );
  };

  const checkFormValidity = () => {
    if (
      invalidName ||
      enteredName.trim() === '' ||
      invalidLastname ||
      enteredLastname.trim() === '' ||
      invalidPhone ||
      enteredPhone.trim() === '' ||
      invalidEmail ||
      enteredEmail.trim() === ''
    ) {
      return false;
    }
    return true;
  };

  const updateContacts = (key) => {
    setLoaderPlace(CONTACTS);
    const formIsValid = checkFormValidity();

    if (!formIsValid) {
      dispatch(
        uiActions.setError('please fill all inputs with correct information')
      );
      return;
    }
    const upddatedContacts = {
      name: enteredName,
      lastName: enteredLastname,
      email: enteredEmail,
      phone: enteredPhone,
    };
    httpRequest(
      {
        url: `/users/${key}/contacts.json`,
        method: 'PUT',
        body: upddatedContacts,
      },
      () => {
        dispatch(fetchUserData(userId, vars.USER_CONTACTS));
        setContactsFormSuccess(true);
      }
    );
  };

  const changeDataSubmitHandler = (e) => {
    e.preventDefault();
    getFirebaseKey(userId, updateContacts);
  };

  const closeSuccessMsgHandler = () => {
    contactsFormSuccess && setContactsFormSuccess(false);
    passwordFormSuccess && setPasswordFormSuccess(false);
  };

  const contactsForm = contactsFormSuccess ? (
    <FormSuccess close={closeSuccessMsgHandler} fullForm />
  ) : (
    <form onSubmit={changeDataSubmitHandler}>
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
      {isLoading & (loaderPlace === CONTACTS) ? <Loader small /> : <div />}
      <Button btnStyle={vars.BTN_DARK} submit>
        Confirm Changes
      </Button>
    </form>
  );

  const passwordForm = passwordFormSuccess ? (
    <FormSuccess close={closeSuccessMsgHandler} fullForm />
  ) : (
    <form onSubmit={changePasswordSubmitHandler}>
      <Input
        type="password"
        id="old-password"
        label=" Old Password"
        onChange={oldPasswordChangeHandler}
        onBlur={oldPasswordBlurHandler}
        errorMsg={oldPasswordError}
        invalid={invalidOldPassword}
        value={oldPassword}
      />
      <Input
        type="password"
        id="new-password"
        label="New Password"
        onChange={newPasswordChangeHandler}
        onBlur={newPasswordBlurHandler}
        errorMsg={newPasswordError}
        invalid={invalidNewPassword}
        value={newPassword}
      />
      <Input
        type="password"
        id="confirm-password"
        label=" Confirm New Password"
        onChange={confirmPasswordChangeHandler}
        onBlur={confirmPasswordBlurHandler}
        errorMsg={confirmPasswordError}
        invalid={invalidConfirmPassword}
        value={confirmPassword}
      />
      {isLoading & (loaderPlace === PASSWORD) ? <Loader small /> : <div />}
      <Button btnStyle={vars.BTN_DARK} submit>
        Confirm Changes
      </Button>
    </form>
  );

  return (
    <div className={styles.contacts}>
      <h1>My Contacts</h1>

      <Card className={styles.personalDataForm}>
        <h3>Edit Personal Data</h3>
        {name === '' ? <Loader /> : contactsForm}
      </Card>
      <Card className={styles.passwordForm}>
        <h3>Edit Password</h3>
        {passwordForm}
      </Card>
    </div>
  );
};

export default Contacts;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../store/profile-actions';
import { getFirebaseKey } from '../../shared/getFirebaseKey';
import { authHttpRequest, httpRequest } from '../../shared/httpRequest';
import { uiActions } from '../../store/ui-slice';
import useInput from '../../hooks/useInput';
import Input from '../UI/Input';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Loader from '../UI/Loader';
import styles from './Contacts.module.scss';

const Contacts = () => {
  const userId = useSelector((state) => state.profile.userId);
  const { name, lastName, email, phone } = useSelector(
    (state) => state.profile.userContacts
  );
  const isLoading = useSelector((state) => state.ui.isLoading);
  const [loaderPlace, setLoaderPlace] = useState('');
  const dispatch = useDispatch();

  const {
    value: enteredName,
    invalid: invalidName,
    error: nameError,
    changeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
  } = useInput('name', name);

  const {
    value: enteredLastname,
    invalid: invalidLastname,
    error: lastnameError,
    changeHandler: lastnameChangeHandler,
    blurHandler: lastnameBlurHandler,
  } = useInput('name', lastName);

  const {
    value: enteredEmail,
    invalid: invalidEmail,
    error: emailError,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
  } = useInput('email', email);

  const {
    value: enteredPhone,
    invalid: invalidPhone,
    error: phoneError,
    changeHandler: phoneChangeHandler,
    blurHandler: phoneBlurHandler,
  } = useInput('phone', phone);

  const {
    value: oldPassword,
    invalid: invalidOldPassword,
    error: oldPasswordError,
    changeHandler: oldPasswordChangeHandler,
    blurHandler: oldPasswordBlurHandler,
  } = useInput('password');
  const {
    value: newPassword,
    invalid: invalidNewPassword,
    error: newPasswordError,
    changeHandler: newPasswordChangeHandler,
    blurHandler: newPasswordBlurHandler,
  } = useInput('password');

  const {
    value: confirmPassword,
    invalid: invalidConfirmPassword,
    error: confirmPasswordError,
    changeHandler: confirmPasswordChangeHandler,
    blurHandler: confirmPasswordBlurHandler,
  } = useInput('password');

  useEffect(() => {
    dispatch(fetchUserData(userId, 'contacts'));
  }, [dispatch, userId]);

  const changePasswordSubmitHandler = (e) => {
    setLoaderPlace('passwordForm');
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
    const token = localStorage.getItem('token');
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
      () => console.log('success')
    );
  };

  const updateContacts = (key) => {
    setLoaderPlace('contactsForm');
    const upddatedContacts = {
      name: enteredName.trim() === '' ? name : enteredName,
      lastName: enteredLastname.trim() === '' ? lastName : enteredLastname,
      email: enteredEmail.trim() === '' ? email : enteredEmail,
      phone: enteredPhone.trim() === '' ? phone : enteredPhone,
    };
    httpRequest(
      {
        url: `/users/${key}/contacts.json`,
        method: 'PUT',
        body: upddatedContacts,
      },
      () => {
        dispatch(fetchUserData(userId, 'contacts'));
      }
    );
  };

  const changeDataSubmitHandler = (e) => {
    e.preventDefault();
    getFirebaseKey(userId, updateContacts);
  };

  return (
    <div className={styles.contacts}>
      <h1>My Contacts</h1>

      <Card className={styles.personalDataForm}>
        <h3>Edit Personal Data</h3>
        {name === '' ? (
          <Loader />
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
            {isLoading & (loaderPlace === 'contactsForm') ? (
              <Loader small />
            ) : (
              <div />
            )}
            <Button btnStyle="btnDark" submit>
              Confirm Changes
            </Button>
          </form>
        )}
      </Card>
      <Card className={styles.passwordForm}>
        <h3>Edit Password</h3>
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
          {isLoading & (loaderPlace === 'passwordForm') ? (
            <Loader small />
          ) : (
            <div />
          )}
          <Button btnStyle="btnDark" submit>
            Confirm Changes
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Contacts;

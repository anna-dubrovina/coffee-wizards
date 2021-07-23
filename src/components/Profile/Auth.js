import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/profile-actions';
import useInput from '../../hooks/useInput';
import Input from '../UI/Input';
import Card from '../UI/Card';
import Button from '../UI/Button';
import styles from './Auth.module.scss';

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();

  const {
    value: enteredEmail,
    invalid: invalidEmail,
    error: emailError,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
  } = useInput('email');

  const {
    value: enteredPassword,
    invalid: invalidPassword,
    error: passwordError,
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
  } = useInput('password');

  const switchAuthModeHandler = () => setIsSignup((curState) => !curState);

  const loginHandler = (e) => {
    e.preventDefault();
    const url = isSignup
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

    dispatch(login(url, enteredEmail, enteredPassword, isSignup));
  };

  let switchAuthMode = (
    <p>
      Already have an account?
      <span onClick={switchAuthModeHandler}> Sign In</span>
    </p>
  );
  if (!isSignup) {
    switchAuthMode = (
      <p>
        Don't have an account?
        <span onClick={switchAuthModeHandler}> Create Account </span>
      </p>
    );
  }
  return (
    <Card className={styles.auth}>
      <h3>Enter Your Log In Information</h3>
      <form onSubmit={loginHandler}>
        <Input
          type="email"
          id="loginEmail"
          placeholder="You Email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          errorMsg={emailError}
          invalid={invalidEmail}
          value={enteredEmail}
        />
        <Input
          type="password"
          id="password"
          placeholder="Your password"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          errorMsg={passwordError}
          invalid={invalidPassword}
          value={enteredPassword}
        />
        <Button btnStyle="btnDark">{isSignup ? 'Sign Up' : 'Log In'}</Button>
        {switchAuthMode}
      </form>
    </Card>
  );
};

export default Auth;

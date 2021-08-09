import { useState } from 'react';
import useInput from '../../hooks/useInput';
import * as vars from '../../shared/globalVars';
import Input from './Input';
import Button from './Button';
import FormSuccess from './FormSuccess';

const CallbackForm = (props) => {
  const [formSuccess, setFormSuccess] = useState(false);

  const {
    value: enteredName,
    invalid: invalidName,
    error: nameError,
    changeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(vars.NAME_INPUT);

  const {
    value: enteredEmail,
    invalid: invalidEmail,
    error: emailError,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(vars.EMAIL_INPUT);

  const {
    value: enteredPhone,
    invalid: invalidPhone,
    error: phoneError,
    changeHandler: phoneChangeHandler,
    blurHandler: phoneBlurHandler,
    reset: resetPhone,
  } = useInput(vars.PHONE_INPUT);

  const {
    value: enteredMsg,
    changeHandler: msgChangeHandler,
    blurHandler: msgBlurHandler,
    reset: resetMsg,
  } = useInput('');

  const closeSuccessMsgHandler = () => setFormSuccess(false);
  const checkFormValidity = () => {
    if (
      invalidName ||
      enteredName.trim() === '' ||
      invalidPhone ||
      enteredPhone.trim() === '' ||
      invalidEmail & props.fullForm ||
      (enteredEmail.trim() === '') & props.fullForm ||
      (enteredMsg.trim() === '') & props.fullForm
    ) {
      return false;
    }
    return true;
  };
  const formIsValid = checkFormValidity();

  const submitHandler = (e) => {
    e.preventDefault();
    setFormSuccess(true);
    resetName();
    resetPhone();
    props.fullForm && resetEmail();
    props.fullForm && resetMsg();
  };

  const fullFormInputs = props.fullForm && (
    <>
      <Input
        type="email"
        id="callbackEmail"
        placeholder="Enter Your Email"
        value={enteredEmail}
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        errorMsg={emailError}
        invalid={invalidEmail}
      />
      <Input
        textarea
        type="text"
        id="message"
        placeholder="Enter Your Message"
        value={enteredMsg}
        onChange={msgChangeHandler}
        onBlur={msgBlurHandler}
      />
    </>
  );

  return formSuccess ? (
    <FormSuccess close={closeSuccessMsgHandler} fullForm={props.fullForm} />
  ) : (
    <form
      onSubmit={submitHandler}
      className={!props.fullForm ? 'form-modal' : ''}
    >
      <h3> {props.title} </h3>
      {!props.fullForm && <p>We will contact you ASAP</p>}
      <Input
        type="text"
        id="name"
        placeholder="Enter Your Name"
        value={enteredName}
        onChange={nameChangeHandler}
        onBlur={nameBlurHandler}
        errorMsg={nameError}
        invalid={invalidName}
      />
      <Input
        type="text"
        id="phone"
        placeholder="Enter Your Phone Number"
        value={enteredPhone}
        onChange={phoneChangeHandler}
        onBlur={phoneBlurHandler}
        errorMsg={phoneError}
        invalid={invalidPhone}
      />
      {fullFormInputs}
      <Button type="submit" btnStyle={vars.BTN_DARK} disabled={!formIsValid}>
        Confirm
      </Button>
    </form>
  );
};

export default CallbackForm;

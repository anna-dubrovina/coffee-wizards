import { useEffect, useReducer } from 'react';
import { validateValue } from '../shared/validateValue';

const CHANGE = 'change',
  BLUR = 'blur',
  RESET = 'reset',
  INITIAL_STATE = { value: '', isTouched: false };

const inputStateReducer = (state, action) => {
  switch (action.type) {
    case CHANGE:
      return { ...state, value: action.value };
    case BLUR:
      return { ...state, isTouched: true };
    case RESET:
      return INITIAL_STATE;
    default:
      return INITIAL_STATE;
  }
};

const useInput = (type, defaultValue) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, INITIAL_STATE);
  const { isValid, errorMsg } = validateValue(type, inputState.value);
  const invalid = !isValid && inputState.isTouched;
  const error = invalid && errorMsg;

  useEffect(
    () => defaultValue && dispatch({ type: CHANGE, value: defaultValue }),
    [defaultValue]
  );

  const changeHandler = (e) =>
    dispatch({ type: CHANGE, value: e.target.value });
  const blurHandler = () => dispatch({ type: BLUR });
  const reset = () => dispatch({ type: RESET });

  return {
    value: inputState.value,
    invalid,
    error,
    changeHandler,
    blurHandler,
    reset,
  };
};

export default useInput;

import { useEffect, useReducer } from 'react';
import { validateValue } from '../shared/validateValue';

const initialState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return { ...state, value: action.value };
    case 'BLUR':
      return { ...state, isTouched: true };
    case 'RESET':
      return initialState;
    default:
      return initialState;
  }
};

const useInput = (type, defaultValue) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialState);
  const { isValid, errorMsg } = validateValue(type, inputState.value);
  const invalid = !isValid && inputState.isTouched;
  const error = invalid && errorMsg;

  useEffect(() => {
    if (defaultValue) {
      dispatch({ type: 'CHANGE', value: defaultValue });
    }
  }, [defaultValue]);

  const changeHandler = (e) =>
    dispatch({ type: 'CHANGE', value: e.target.value });
  const blurHandler = () => dispatch({ type: 'BLUR' });
  const reset = () => dispatch({ type: 'RESET' });

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

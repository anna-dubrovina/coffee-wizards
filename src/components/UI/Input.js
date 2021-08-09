import { useEffect, useState } from 'react';
import styles from './Input.module.scss';

const Input = (props) => {
  const [isErrorStyle, setIsErrorStyle] = useState(false);
  const classes = isErrorStyle
    ? [styles.control, styles.invalid]
    : [styles.control];

  useEffect(() => {
    let timer;
    if (props.invalid) {
      setIsErrorStyle(true);
      timer = setTimeout(() => setIsErrorStyle(false), [3000]);
    }
    return () => clearTimeout(timer);
  }, [props.invalid, props.value]);

  let inputType = (
    <input
      min={props.min}
      max={props.max}
      disabled={props.disabled}
      type={props.type}
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      placeholder={props.placeholder}
    />
  );

  if (props.textarea) {
    inputType = (
      <textarea
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
      />
    );
  }

  return (
    <div className={classes.join(' ')}>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      {inputType}
      {isErrorStyle && <span>{props.errorMsg}</span>}
    </div>
  );
};

export default Input;

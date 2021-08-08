import styles from './Input.module.scss';

const Input = (props) => {
  const classes = props.invalid
    ? [styles.control, styles.invalid]
    : [styles.control];

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
      defaultValue={props.default}
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
      <span>{props.errorMsg}</span>
    </div>
  );
};

export default Input;

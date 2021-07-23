import styles from './Input.module.scss';

const Input = (props) => {
  let inputType = (
    <input
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
    <div className={`${styles.control} ${props.invalid ? styles.invalid : ''}`}>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      {inputType}
      <span>{props.errorMsg}</span>
    </div>
  );
};

export default Input;

import styles from './Checkbox.module.scss';

const Checkbox = (props) => {
  return (
    <div className={styles.checkbox}>
      <input type="checkbox" id={props.id} onChange={props.onChange} />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

export default Checkbox;

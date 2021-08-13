import styles from './Checkbox.module.scss';

const Checkbox = (props) => {
  return (
    <div className={styles.checkbox}>
      {props.readOnly ? (
        <input type="checkbox" id={props.id} checked={props.checked} readOnly />
      ) : (
        <input type="checkbox" id={props.id} onChange={props.onChange} />
      )}
       <span>{props.label}</span>
    </div>
  );
};

export default Checkbox;

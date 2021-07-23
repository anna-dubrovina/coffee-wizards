import styles from './Card.module.scss';
const Card = (props) => {
  return (
    <div className={[styles.card, props.className, styles[props.cardStyle]].join(' ')}>
      {props.children}
    </div>
  );
};

export default Card;

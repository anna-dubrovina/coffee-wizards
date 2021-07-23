import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './IconItem.module.scss';

const IconItem = (props) => {
  const { totalQuantity } = useSelector((state) => state.cart);

  let content = (
    <Link to={props.link}>
      {props.total && <div className={styles.total}>{totalQuantity}</div>}
      <img src={props.icon} alt={props.children} />
    </Link>
  );

  if (props.external) {
    content = (
      <a href={'https://www.' + props.link + '.com'}>
        <img src={props.icon} alt={props.link} />
      </a>
    );
  }

  return (
    <li onClick={props.clicked}>
      <div className={styles.iconWrapper}>{content}</div>
      <p>{props.children}</p>
    </li>
  );
};

export default IconItem;

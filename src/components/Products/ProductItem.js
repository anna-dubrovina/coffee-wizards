import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { cartActions } from '../../store/cart-slice';
import * as vars from '../../shared/globalVars';
import Card from '../UI/Card';
import Button from '../UI/Button';
import styles from './ProductItem.module.scss';

const ProductItem = (props) => {
  const { id, title, img, category, subcategory } = props.product;
  const dispatch = useDispatch();
  let beansSize = vars.PROD_SIZE_M;
  if (props.size === vars.WEIGHT_S) {
    beansSize = vars.PROD_SIZE_S;
  } else if (props.size === vars.WEIGHT_L) {
    beansSize = vars.PROD_SIZE_L;
  }
  const prodId = subcategory === vars.BEANS ? id + beansSize : id;

  const itemData = {
    id: prodId,
    title,
    price: props.price,
    img,
    size: props.size,
    category: category + ' / ' + subcategory,
  };

  const openCartHanlder = () => {
    dispatch(cartActions.addItem(itemData));
    dispatch(uiActions.openCart());
  };

  return (
    <li className={styles.productItem}>
      <Card cardStyle={props.cardStyle}>
        <Link to={vars.PRODUCT_DYNAMIC + id}>
          <img src={img} alt={title} />
          <h4>{title}</h4>
        </Link>
        <span>$ {props.price}</span>
        <Button btnStyle={vars.BTN_MAIN} clicked={openCartHanlder}>
          Add to Cart
        </Button>
      </Card>
    </li>
  );
};

export default ProductItem;

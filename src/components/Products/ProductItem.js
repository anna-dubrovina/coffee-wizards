import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { cartActions } from '../../store/cart-slice';
import * as vars from '../../shared/globalVars';
import Card from '../UI/Card';
import Button from '../UI/Button';
import styles from './ProductItem.module.scss';

const ProductItem = (props) => {
  const { id, title, price, img, size, category, subcategory } = props.product;
  const dispatch = useDispatch();
  const prodPrice = price || size.medium.price;
  const prodSize = size && size.medium ? size.medium.weight : size;
  const prodId = subcategory === vars.BEANS ? id + vars.PROD_SIZE_M : id;
  const itemData = {
    id: prodId,
    title,
    price: prodPrice,
    img,
    size: prodSize,
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
        <span>$ {prodPrice}</span>
        <Button btnStyle={vars.BTN_MAIN} clicked={openCartHanlder}>
          Add to Cart
        </Button>
      </Card>
    </li>
  );
};

export default ProductItem;

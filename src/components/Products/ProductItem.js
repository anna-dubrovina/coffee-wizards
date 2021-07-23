import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { cartActions } from '../../store/cart-slice';

import Card from '../UI/Card';
import Button from '../UI/Button';
import styles from './ProductItem.module.scss';

const ProductItem = (props) => {
  const { id, title, price, img, size, category, subcategory } = props.product;
  const dispatch = useDispatch();
  const prodPrice = price || size.medium.price;
  const prodSize = size && size.medium ? size.medium.weight : size;
  const prodId = subcategory === 'beans' ? id + 'medium' : id;

  const openCartHanlder = () => {
    dispatch(
      cartActions.addItem({
        id: prodId,
        title,
        price: prodPrice,
        img,
        size: prodSize,
        category: category + ' / ' + subcategory,
      })
    );
    dispatch(uiActions.openCart());
  };

  return (
    <li className={styles.productItem}>
      <Card cardStyle={props.cardStyle}>
        <Link to={'/product/' + id}>
          <img src={img} alt={title} />
          <h4>{title}</h4>
        </Link>
        <span>$ {prodPrice}</span>
        <Button btnStyle="btnMain" clicked={openCartHanlder}>
          Add to Cart
        </Button>
      </Card>
    </li>
  );
};

export default ProductItem;

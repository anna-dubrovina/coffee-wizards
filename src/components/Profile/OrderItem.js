import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as vars from '../../shared/globalVars';
import { cartActions } from '../../store/cart-slice';
import { uiActions } from '../../store/ui-slice';
import Card from '../UI/Card';
import Button from '../UI/Button';
import styles from './OrderItem.module.scss';

import arrowDown from '../../assets/icons/arrow-down.svg';
import arrowUp from '../../assets/icons/arrow-up.svg';

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const { id, deliveryInfo, amount, prodList } = props;
  const dispatch = useDispatch();
  const arrowIcon = showDetails ? arrowUp : arrowDown;

  const toggleDetailsHandler = () => setShowDetails((curState) => !curState);

  const repeatOrderHandler = () => {
    const totalQuantity = prodList.reduce(
      (accumulator, item) => accumulator + item.quantity,
      0
    );
    console.log(amount);
    dispatch(
      cartActions.setCart({
        items: prodList,
        totalAmount: amount,
        totalQuantity,
      })
    );
    dispatch(uiActions.openCart());
  };

  let productList;
  if (!showDetails) {
    productList = prodList.map((item, index) => {
      if (index > 2) {
        return null;
      }
      return (
        <li key={item.id}>
          <img src={item.img} alt="product" />
        </li>
      );
    });
  }

  if (showDetails) {
    productList = prodList.map((item) => {
      const prodId = item.id.substring(0, 4);

      return (
        <li key={item.id}>
          <Card className={styles.orderProdItem} cardStyle={vars.CARD_DARK}>
            <Link to={vars.PRODUCT_DYNAMIC + prodId}>
              <img src={item.img} alt="product" />
            </Link>
            <div>
              <Link to={vars.PRODUCT_DYNAMIC + prodId}>
                <h5>{item.title}</h5>
              </Link>
              <span>{item.category}</span>
              <span>{item.size}</span>
              <span>
                {item.quantity} X $ {item.price.toFixed(2)}
              </span>
            </div>
          </Card>
        </li>
      );
    });
  }

  return (
    <li onClick={toggleDetailsHandler}>
      <Card className={styles.orderItem}>
        <div className={styles.orderHeader}>
          <h3>
            No.{id} from {deliveryInfo.date}
          </h3>
          {!showDetails && (
            <>
              <p>
                Order Amount: <span>$ {amount}</span>
              </p>
              <ul className={styles.orderProducts}>{productList}</ul>
            </>
          )}
          <img src={arrowIcon} alt="arrow icon" />
        </div>
        {showDetails && (
          <div className={styles.orderDetail}>
            <h4>Delivery Information</h4>
            <ul>
              <li>{deliveryInfo.name + ' ' + deliveryInfo.lastName}</li>
              <li>{deliveryInfo.email}</li>
              <li>{deliveryInfo.phone}</li>
              <li>{deliveryInfo.paymentMethod}</li>
              <li>{deliveryInfo.deliveryMethod} Delivery</li>
              <li>
                {deliveryInfo.city +
                  ', ' +
                  deliveryInfo.address +
                  ', ' +
                  deliveryInfo.postalCode}
              </li>
            </ul>
            <h4>Ordered Products</h4>
            <ul>{productList}</ul>
            <h4>Order Amount: $ {amount}</h4>
            <Button btnStyle={vars.BTN_DARK} clicked={repeatOrderHandler}>
              Repeat Order
            </Button>
          </div>
        )}
      </Card>
    </li>
  );
};

export default OrderItem;

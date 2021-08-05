import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { COFFEE_MAIN } from '../../shared/globalVars';
import { httpRequest } from '../../shared/httpRequest';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Loader from '../UI/Loader';
import OrderItem from './OrderItem';
import styles from './Orders.module.scss';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { userId } = useSelector((state) => state.profile);
  const { isLoading } = useSelector((state) => state.ui);
  const history = useHistory();

  useEffect(() => {
    const fetchedOrders = [];
    httpRequest(
      { url: `/orders.json?orderBy="userId"&equalTo="${userId}"` },
      (resData) => {
        for (const key in resData) {
          fetchedOrders.push(resData[key]);
        }
      }
    );
    setOrders(fetchedOrders);
  }, [userId]);

  const buyCoffeeHandler = () => history.push(COFFEE_MAIN);

  let ordersList;
  if (orders.length > 0) {
    ordersList = orders.map((item) => {
      return (
        <OrderItem
          key={item.orderId}
          id={item.orderId}
          deliveryInfo={item.deliveryInfo}
          prodList={item.products}
          amount={item.amount}
        />
      );
    });
  }

  return isLoading ? (
    <Loader />
  ) : (
    <div className={styles.orders}>
      <h1>My Orders</h1>
      {orders.length === 0 && (
        <Card>
          <h4>You haven't any orders yet</h4>
          <Button clicked={buyCoffeeHandler}>Buy some magic coffee</Button>
        </Card>
      )}
      <ul>{ordersList}</ul>
    </div>
  );
};

export default Orders;

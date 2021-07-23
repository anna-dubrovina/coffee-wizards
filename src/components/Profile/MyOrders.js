// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';


const MyOrders = () => {
  // const [orders, setOrders] = useState();
  // const { userId } = useSelector((state) => state.profile);

  // useEffect(() => {
  //   fetch(
  //     `${firebaseConfig.databaseURL}/orders.json?orderBy="userId"&equalTo="${userId}"`
  //   )
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       } else {
  //         throw new Error('Request failed!');
  //       }
  //     })
  //     .then((resData) => {
  //       console.log(resData);
  //     })
  //     .catch((err) => console.log(err));
  // }, [userId]);
  return <h2>My Orders</h2>;
};

export default MyOrders;

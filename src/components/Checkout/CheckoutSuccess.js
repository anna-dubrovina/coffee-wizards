import { useHistory } from 'react-router-dom';
import { BTN_DARK } from '../../shared/globalVars';
import Button from '../UI/Button';
import Card from '../UI/Card';
import successIcon from '../../assets/icons/checked.svg';

const CheckoutSuccess = (props) => {
  const history = useHistory();
  const goBackHandler = () => history.push('/');

  return (
    <div className="status-page">
      <Card>
        <img src={successIcon} alt="success" />
        <h2>Thank You For Your Order!</h2>
        <h4>Your order number is {props.orderId}. </h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <Button btnStyle={BTN_DARK} clicked={goBackHandler}>
          Back to Shopping
        </Button>
      </Card>
    </div>
  );
};

export default CheckoutSuccess;

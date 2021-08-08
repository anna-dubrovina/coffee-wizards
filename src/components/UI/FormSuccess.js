import Button from './Button';
import successIcon from '../../assets/icons/checked.svg';

const FormSuccess = (props) => {
  const closeMessageHandler = () => props.close();
  return (
    <div className="form-success">
      <img src={successIcon} alt="success" />
      <h3>Your Form Was Successefully Sent !</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      {props.fullForm && (
        <Button btnStyle="btnDark" clicked={closeMessageHandler}>
          OK
        </Button>
      )}
    </div>
  );
};

export default FormSuccess;

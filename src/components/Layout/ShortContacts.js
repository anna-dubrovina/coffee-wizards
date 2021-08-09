import { useDispatch } from 'react-redux';
import { BTN_DARK } from '../../shared/globalVars';
import { uiActions } from '../../store/ui-slice';
import Button from '../UI/Button';

const ShortContacts = (props) => {
  const dispatch = useDispatch();
  const openCallbackFormHandler = () => dispatch(uiActions.openCallbackForm());

  return (
    <div>
      <ul>
        <li> coffee@wizards.com </li>
        <li> (555) 555 55 55</li>
        <li> 10:00 AM – 7:00 PM </li>
      </ul>
      <Button
        btnStyle={props.dark && BTN_DARK}
        clicked={openCallbackFormHandler}
      >
        Callback Me
      </Button>
    </div>
  );
};

export default ShortContacts;

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { uiActions } from '../store/ui-slice';
import { BTN_DARK } from '../shared/globalVars';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const NotFoundPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const goBackHandler = () => history.goBack();

  useEffect(() => {
    dispatch(uiActions.setFound(false));
    return () => dispatch(uiActions.setFound(true));
  }, [dispatch]);

  return (
    <div className="status-page">
      <Card>
        <h2>Page is not found </h2>
        <p>
          The page address you requested is no longer exists, or has never
          existed.
        </p>
        <p>
          If you know exactly what you are looking for, use the search bar or
          navigation menu.
        </p>
        <Button btnStyle={BTN_DARK} clicked={goBackHandler}>
          Go Back
        </Button>
      </Card>
    </div>
  );
};

export default NotFoundPage;

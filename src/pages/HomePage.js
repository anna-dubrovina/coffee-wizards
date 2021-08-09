import { useHistory } from 'react-router-dom';
import * as vars from '../shared/globalVars';
import HomeContent from '../components/Home/HomeContent';
import Header from '../components/Layout/Header';
import Button from '../components/UI/Button';

const HomePage = () => {
  const history = useHistory();
  const gotoProductsPageHandler = () => history.push(vars.COFFEE_MAIN);

  return (
    <>
      <Header title="Try real magic in coffee making with Coffee Wizards">
        <Button btnStyle={vars.BTN_DARK} clicked={gotoProductsPageHandler}>
          Start Magic
        </Button>
      </Header>
      <HomeContent />
    </>
  );
};

export default HomePage;

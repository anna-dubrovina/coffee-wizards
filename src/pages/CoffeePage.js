import { Route, Switch } from 'react-router-dom';
import * as vars from '../shared/globalVars';
import Header from '../components/Layout/Header';
import Coffee from '../components/Products/Coffee';
import ProductsList from '../components/Products/ProductsList';
import NotFoundPage from './NotFoundPage';

const CoffeePage = () => {
  return (
    <div>
      <Header title={'Our Wizarding Coffee'} />
      <Switch>
        <Route path={vars.COFFEE_BEANS}>
          <ProductsList listType="subcategory" />
        </Route>
        <Route path={vars.COFFEE_GROUND}>
          <ProductsList listType="subcategory" />
        </Route>
        <Route path={vars.COFFEE_CAPSULES}>
          <ProductsList listType="subcategory" />
        </Route>
        <Route exact path={vars.COFFEE_MAIN}>
          <Coffee />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  );
};

export default CoffeePage;

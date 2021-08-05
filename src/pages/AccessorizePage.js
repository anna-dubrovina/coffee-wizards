import { Route, Switch } from 'react-router-dom';
import * as vars from '../shared/globalVars';
import Header from '../components/Layout/Header';
import Accessorize from '../components/Products/Accessorize';
import ProductsList from '../components/Products/ProductsList';
import NotFoundPage from './NotFoundPage';

const AccessorizePage = () => {
  return (
    <div>
      <Header title="Accesorize for Wizarding Coffee Making" />
      <Switch>
        <Route path={vars.ACCS_CUPS}>
          <ProductsList listType="subcategory" />
        </Route>
        <Route path={vars.ACCS_TOOLS}>
          <ProductsList listType="subcategory" />
        </Route>
        <Route exact path={vars.ACCS_MAIN}>
          <Accessorize />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  );
};

export default AccessorizePage;

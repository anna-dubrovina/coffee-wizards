import { Route, Switch } from 'react-router-dom';
import * as vars from '../shared/globalVars';
import Header from '../components/Layout/Header';
import Accessorize from '../components/Products/Accessorize';
import ProductsListFull from '../components/Products/ProductsListFull';
import NotFoundPage from './NotFoundPage';

const AccessorizePage = () => {
  return (
    <div>
      <Header title="Accesorize for Wizarding Coffee Making" />
      <Switch>
        <Route path={vars.ACCS_CUPS}>
          <ProductsListFull />
        </Route>
        <Route path={vars.ACCS_TOOLS}>
          <ProductsListFull />
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

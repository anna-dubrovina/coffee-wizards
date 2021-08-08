import { Route, Switch } from 'react-router-dom';
import * as vars from '../shared/globalVars';
import Header from '../components/Layout/Header';
import Equipment from '../components/Products/Equipment';
import ProductsListFull from '../components/Products/ProductsListFull';
import NotFoundPage from './NotFoundPage';

const EquipmentPage = () => {
  return (
    <div>
      <Header title="Magical Staff for Coffee Wizarding" />
      <Switch>
        <Route path={vars.EQUIP_GRINDERS}>
          <ProductsListFull />
        </Route>
        <Route path={vars.EQUIP_MANUAL}>
          <ProductsListFull />
        </Route>
        <Route path={vars.EQUIP_MACHINES}>
          <ProductsListFull />
        </Route>
        <Route path={vars.EQUIP_MAIN} exact>
          <Equipment />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  );
};

export default EquipmentPage;

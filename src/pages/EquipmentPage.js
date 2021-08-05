import { Route, Switch } from 'react-router-dom';
import * as vars from '../shared/globalVars';
import Header from '../components/Layout/Header';
import Equipment from '../components/Products/Equipment';
import ProductsList from '../components/Products/ProductsList';
import NotFoundPage from './NotFoundPage';

const EquipmentPage = () => {
  return (
    <div>
      <Header title="Magical Staff for Coffee Wizarding" />

      <Switch>
        <Route path={vars.EQUIP_GRINDERS}>
          <ProductsList listType={vars.SUBCATEGORY} />
        </Route>
        <Route path={vars.EQUIP_MANUAL}>
          <ProductsList listType={vars.SUBCATEGORY} />
        </Route>
        <Route path={vars.EQUIP_MACHINES}>
          <ProductsList listType={vars.SUBCATEGORY} />
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

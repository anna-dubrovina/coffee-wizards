import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Equipment from '../components/Products/Equipment/Equipment';
// import EquipmentMachines from '../components/Products/Equipment/EquipmentMachines';
// import EquipmentGrinders from '../components/Products/Equipment/EquipmentGrinders';
// import EquipmentManual from '../components/Products/Equipment/EquipmentManual';
import Header from '../components/Layout/Header';
import NotFoundPage from './NotFoundPage';
import ProductsList from '../components/Products/ProductsList';
import Section from '../components/Layout/Section';

const EquipmentPage = () => {
  const { path } = useRouteMatch();
  return (
    <div>
      <Header title="Magical Staff for Coffee Wizarding" />

      <Switch>
        <Route path={path + '/grinders'}>
          <ProductsList listType="subcategory" />
        </Route>
        <Route path={path + '/manual'}>
          <ProductsList listType="subcategory" />
        </Route>
        <Route path={path + '/machines'}>
          <ProductsList listType="subcategory" />
        </Route>
        <Route path={path} exact>
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

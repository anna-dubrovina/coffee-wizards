import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Equipment from '../components/Products/Equipment/Equipment';
import EquipmentMachines from '../components/Products/Equipment/EquipmentMachines';
import EquipmentGrinders from '../components/Products/Equipment/EquipmentGrinders';
import EquipmentManual from '../components/Products/Equipment/EquipmentManual';
import Header from '../components/Layout/Header';

const EquipmentPage = () => {
  const { path } = useRouteMatch();
  return (
    <div>
      <Header title="Magical Staff for Coffee Wizarding" />
      <Switch>
        <Route path={path + '/grinders'}>
          <EquipmentGrinders />
        </Route>
        <Route path={path + '/manual'}>
          <EquipmentManual />
        </Route>
        <Route path={path + '/machines'}>
          <EquipmentMachines />
        </Route>
        <Route path={path} exact>
          <Equipment />
        </Route>
        <Route path="*">
          <h1>Error Page</h1>
        </Route>
      </Switch>
    </div>
  );
};

export default EquipmentPage;

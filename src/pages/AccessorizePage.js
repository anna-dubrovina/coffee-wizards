import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Header from '../components/Layout/Header';
import AccessorizeCups from '../components/Products/Accessorize/AccessorizeCups';
import AccessorizeTools from '../components/Products/Accessorize/AccessorizeTools';
import Accessorize from '../components/Products/Accessorize/Accessorize';

const AccessorizePage = () => {
  const { path } = useRouteMatch();
  return (
    <div>
      <Header title="Accesorize for Wizarding Coffee Making" />

      <Switch>
        <Route path={path + '/cups'}>
          <AccessorizeCups />
        </Route>
        <Route path={path + '/tools'}>
          <AccessorizeTools />
        </Route>
        <Route exact path={path}>
          <Accessorize />
        </Route>
        <Route path="*">
          <h1>Error Page</h1>
        </Route>
      </Switch>
    </div>
  );
};

export default AccessorizePage;

import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Coffee from '../components/Products/Coffee/Coffee';
import CoffeeBeans from '../components/Products/Coffee/CoffeeBeans';
import CoffeeGround from '../components/Products/Coffee/CoffeeGround';
import CoffeeCapsules from '../components/Products/Coffee/CoffeeCapsules';
import Header from '../components/Layout/Header';
import NotFoundPage from './NotFoundPage';

const CoffeePage = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={path}>
        <Header title={'Our Wizarding Coffee'} />
        <Switch>
          <Route path={path + '/beans'}>
            <CoffeeBeans />
          </Route>
          <Route path={path + '/ground'}>
            <CoffeeGround />
          </Route>
          <Route path={path + '/capsules'}>
            <CoffeeCapsules />
          </Route>
          <Route exact path={path}>
            <Coffee />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </Route>
    </Switch>
  );
};

export default CoffeePage;

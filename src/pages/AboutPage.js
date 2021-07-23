import { Route, Switch, useRouteMatch } from 'react-router-dom';
import About from '../components/About/About';
import Header from '../components/Layout/Header';
import AboutDelivery from '../components/About/AboutDelivery';
import AboutBusiness from '../components/About/AboutBusiness';
import AboutContacts from '../components/About/AboutContacts';

const AboutPage = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <Header title="About Coffee Wizards Store" />
      <Switch>
        <Route path={path + '/business'}>
          <AboutBusiness />
        </Route>
        <Route path={path + '/payment-delivery'}>
          <AboutDelivery />
        </Route>
        <Route path={path + '/contacts'}>
          <AboutContacts />
        </Route>
        <Route exact path={path}>
          <About />
        </Route>
        <Route path="*">
          <h1>Error Page</h1>
        </Route>
      </Switch>
    </>
  );
};

export default AboutPage;

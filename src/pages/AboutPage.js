import { Route, Switch } from 'react-router-dom';
import * as vars from '../shared/globalVars';
import About from '../components/About/About';
import AboutDelivery from '../components/About/AboutDelivery';
import AboutBusiness from '../components/About/AboutBusiness';
import AboutContacts from '../components/About/AboutContacts';
import Header from '../components/Layout/Header';
import NotFoundPage from './NotFoundPage';

const AboutPage = () => {
  return (
    <>
      <Header title="About Coffee Wizards Store" />
      <Switch>
        <Route path={vars.ABOUT_BUSINESS}>
          <AboutBusiness />
        </Route>
        <Route path={vars.ABOUT_PAYMENT}>
          <AboutDelivery />
        </Route>
        <Route path={vars.ABOUT_CONTACTS}>
          <AboutContacts />
        </Route>
        <Route exact path={vars.ABOUT_MAIN}>
          <About />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </>
  );
};

export default AboutPage;

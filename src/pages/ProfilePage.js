import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import * as vars from '../shared/globalVars';
import Addresses from '../components/Profile/Addresses';
import Contacts from '../components/Profile/Contacts';
import Auth from '../components/Profile/Auth';
import ProfileSidebar from '../components/Profile/ProfileSidebar';
import Orders from '../components/Profile/Orders';
import Section from '../components/Layout/Section';
import NotFoundPage from './NotFoundPage';

const ProfilePage = () => {
  const { isAuth } = useSelector((state) => state.profile);
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isAuth) {
      history.push(vars.PROFILE_AUTH);
    }
    if (isAuth && pathname === vars.PROFILE_AUTH) {
      history.replace(vars.PROFILE_ORDERS);
    }
  }, [isAuth, history, pathname]);

  return isAuth ? (
    <Section className="page-with-aside">
      <ProfileSidebar />
      <Switch>
        <Route path={vars.PROFILE_CONTACTS} exact>
          <Contacts />
        </Route>
        <Route path={vars.PROFILE_ORDERS} exact>
          <Orders />
        </Route>
        <Route path={vars.PROFILE_ADDRESSES} exact>
          <Addresses />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Section>
  ) : (
    <Route path={vars.PROFILE_AUTH} exact>
      <Auth />
    </Route>
  );
};

export default ProfilePage;

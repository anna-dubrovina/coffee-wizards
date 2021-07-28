import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Auth from '../components/Profile/Auth';
import ProfileSidebar from '../components/Profile/ProfileSidebar';
import Addresses from '../components/Profile/Addresses';
import Contacts from '../components/Profile/Contacts';
import Orders from '../components/Profile/Orders';
import Section from '../components/Layout/Section';

const ProfilePage = () => {
  const { isAuth } = useSelector((state) => state.profile);
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isAuth) {
      history.push('/profile/auth');
    }
    if (isAuth && pathname === '/profile/auth') {
      history.replace('/profile/orders');
    }
  }, [isAuth, history, pathname]);

  return isAuth ? (
    <Section className="page-with-aside">
      <ProfileSidebar />
      <Switch>
        <Route path="/profile/contacts">
          <Contacts />
        </Route>
        <Route path="/profile/orders">
          <Orders />
        </Route>
        <Route path="/profile/addresses">
          <Addresses />
        </Route>
      </Switch>
    </Section>
  ) : (
    <Route path="/profile/auth">
      <Auth />
    </Route>
  );
};

export default ProfilePage;

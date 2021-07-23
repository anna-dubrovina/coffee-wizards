import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import Auth from '../components/Profile/Auth';
import ProfileSidebar from '../components/Profile/ProfileSidebar';
import Addresses from '../components/Profile/Addresses';
import Contacts from '../components/Profile/Contacts';
import MyOrders from '../components/Profile/MyOrders';
import Section from '../components/Layout/Section';

const ProfilePage = () => {
  const { isAuth } = useSelector((state) => state.profile);
  const history = useHistory();

  useEffect(() => {
    const path = isAuth ? '/profile/contacts' : '/profile/auth';
    history.push(path);
  }, [isAuth, history]);

  return isAuth ? (
    <Section className="page-with-aside">
      <ProfileSidebar />
      <Switch>
        <Route path="/profile/contacts">
          <Contacts />
        </Route>
        <Route path="/profile/orders">
          <MyOrders />
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

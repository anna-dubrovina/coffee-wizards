import { useDispatch } from 'react-redux';
import { logout } from '../../store/profile-actions';
import SidebarItem from './SidebarItem';
import styles from './ProfileSidebar.module.scss';

const ProfileSidebar = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => dispatch(logout());

  return (
    <aside className={styles.sidebar}>
      <ul>
        <SidebarItem link="/profile/contacts"> My Contacts</SidebarItem>
        <SidebarItem link="/profile/addresses"> My Addresses</SidebarItem>
        <SidebarItem link="/profile/orders"> My Orders</SidebarItem>
        <SidebarItem link="/" clicked={logoutHandler}>
          Logout
        </SidebarItem>
      </ul>
    </aside>
  );
};

export default ProfileSidebar;

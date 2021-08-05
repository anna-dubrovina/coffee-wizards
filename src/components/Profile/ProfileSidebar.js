import { useDispatch } from 'react-redux';
import { logout } from '../../store/profile-actions';
import * as vars from '../../shared/globalVars';
import SidebarItem from './SidebarItem';
import styles from './ProfileSidebar.module.scss';

const ProfileSidebar = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => dispatch(logout());

  return (
    <aside className={styles.sidebar}>
      <ul>
        <SidebarItem link={vars.PROFILE_CONTACTS}> My Contacts</SidebarItem>
        <SidebarItem link={vars.PROFILE_ADDRESSES}> My Addresses</SidebarItem>
        <SidebarItem link={vars.PROFILE_ORDERS}> My Orders</SidebarItem>
        <SidebarItem link="/" clicked={logoutHandler}>
          Logout
        </SidebarItem>
      </ul>
    </aside>
  );
};

export default ProfileSidebar;

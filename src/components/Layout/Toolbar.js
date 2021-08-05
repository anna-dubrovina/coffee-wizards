import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import useCurrentWidth from '../../hooks/useCurrentWidth';
import { PROFILE_ORDERS } from '../../shared/globalVars';

import IconItem from './IconItem';
import Contacts from './Contacts';
import NavBar from './NavBar';
import Button from '../UI/Button';
import Logo from '../UI/Logo';

import userIcon from '../../assets/icons/user.svg';
import cartIcon from '../../assets/icons/cart.svg';
import menuIcon from '../../assets/icons/menu.svg';
import styles from './Toolbar.module.scss';

const Toolbar = () => {
  const [showNavMenu, setShowNavMenu] = useState(false);
  const width = useCurrentWidth(!showNavMenu);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const closeNavMenuHandler = () => setShowNavMenu(false);
  const toggleMenuHandler = () => setShowNavMenu((curState) => !curState);
  const openCartHanlder = () => dispatch(uiActions.openCart());

  useEffect(() => {
    width > 600 && closeNavMenuHandler();
  }, [width]);

  return (
    <header className={styles.toolbar}>
      <div className={styles.toolbarContent + ' container'}>
        <div className={styles.contacts}>
          <Contacts />
        </div>

        <Logo />
        <div className={styles.navBtn}>
          <Button clicked={toggleMenuHandler}>
            <img src={menuIcon} alt="menu" />
            Menu
          </Button>
        </div>

        <ul className={styles.profileBar}>
          <IconItem link={PROFILE_ORDERS} icon={userIcon}>
            Profile
          </IconItem>
          <IconItem
            link={pathname}
            icon={cartIcon}
            total
            clicked={openCartHanlder}
          >
            Cart
          </IconItem>
        </ul>

        <NavBar mobileMode={showNavMenu} clicked={closeNavMenuHandler} />
      </div>
    </header>
  );
};

export default Toolbar;

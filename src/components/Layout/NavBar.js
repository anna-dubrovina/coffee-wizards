import NavItem from './NavItem';
import * as vars from '../../shared/globalVars';
import styles from './NavBar.module.scss';

const coffeeDropdown = [
  { title: 'Coffee Beans', link: vars.COFFEE_BEANS },
  { title: 'Ground Coffee', link: vars.COFFEE_GROUND },
  { title: 'Coffee Capsules', link: vars.COFFEE_CAPSULES },
];
const equipmentDropdown = [
  { title: 'Coffee Machines', link: vars.EQUIP_MACHINES },
  { title: 'Manual Brewers', link: vars.EQUIP_MANUAL },
  { title: 'Grinders', link: vars.EQUIP_GRINDERS },
];
const accessorizeDropdown = [
  { title: 'Coffee Cups', link: vars.ACCS_CUPS },
  { title: 'Additional Tools', link: vars.ACCS_TOOLS },
];
const aboutDropdown = [
  { title: 'Our Contacts', link: vars.ABOUT_CONTACTS },
  { title: 'Payment & Delivery', link: vars.ABOUT_PAYMENT },
  { title: 'For Business Clients', link: vars.ABOUT_BUSINESS },
];

const NavBar = (props) => {
  return (
    <nav
      className={
        !props.mobileMode ? `${styles.nav} ${styles.navHidden}` : styles.nav
      }
    >
      <ul>
        <NavItem
          link={vars.COFFEE_MAIN}
          mobile={props.mobileMode}
          dropdown={coffeeDropdown}
          clicked={props.clicked}
        >
          Coffee
        </NavItem>
        <NavItem
          link={vars.EQUIP_MAIN}
          mobile={props.mobileMode}
          dropdown={equipmentDropdown}
          clicked={props.clicked}
        >
          Equipment
        </NavItem>
        <NavItem
          link={vars.ACCS_MAIN}
          mobile={props.mobileMode}
          dropdown={accessorizeDropdown}
          clicked={props.clicked}
        >
          Accessorize
        </NavItem>
        <NavItem
          link={vars.ABOUT_MAIN}
          mobile={props.mobileMode}
          dropdown={aboutDropdown}
          clicked={props.clicked}
        >
          About
        </NavItem>
      </ul>
    </nav>
  );
};

export default NavBar;

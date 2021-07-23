import NavItem from './NavItem';
import styles from './NavBar.module.scss';

const coffeeDropdown = [
  {
    title: 'Coffee Beans',
    link: '/coffee/beans',
  },
  {
    title: 'Ground Coffee',
    link: '/coffee/ground',
  },
  {
    title: 'Coffee Capsules',
    link: '/coffee/capsules',
  },
];

const equipmentDropdown = [
  {
    title: 'Coffee Machines',
    link: '/equipment/machines',
  },
  {
    title: 'Manual Brewers',
    link: '/equipment/manual',
  },
  {
    title: 'Grinders',
    link: '/equipment/grinders',
  },
];
const accessorizeDropdown = [
  {
    title: 'Coffee Cups',
    link: '/accessorize/cups',
  },
  {
    title: 'Additional Tools',
    link: '/accessorize/tools',
  },
];
const aboutDropdown = [
  {
    title: 'Our Contacts',
    link: '/about/contacts',
  },
  {
    title: 'Payment & Delivery',
    link: '/about/payment-delivery',
  },
  {
    title: 'For Business Clients',
    link: '/about/business',
  },
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
          link="/coffee"
          mobile={props.mobileMode}
          dropdown={coffeeDropdown}
          clicked={props.clicked}
        >
          Coffee
        </NavItem>
        <NavItem
          link="/equipment"
          mobile={props.mobileMode}
          dropdown={equipmentDropdown}
          clicked={props.clicked}
        >
          Equipment
        </NavItem>
        <NavItem
          link="/accessorize"
          mobile={props.mobileMode}
          dropdown={accessorizeDropdown}
          clicked={props.clicked}
        >
          Accessorize
        </NavItem>
        <NavItem
          link="/about"
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

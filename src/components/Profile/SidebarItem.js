import { NavLink } from 'react-router-dom';
import styles from './SidebarItem.module.scss';

const SidebarItem = (props) => {
  return (
    <li className={styles.sidebarItem}>
      <NavLink
        to={props.link}
        exact
        activeClassName="selected"
        onClick={props.clicked}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default SidebarItem;

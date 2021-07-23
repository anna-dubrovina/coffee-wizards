import { Link } from 'react-router-dom';
import logoLight from '../../assets/logo/logo-light.png';
import logoDark from '../../assets/logo/logo-dark.png';
import styles from './Logo.module.scss';

const Logo = (props) => {
  return (
    <div className={styles.logo}>
      <Link to="/">
        <img
          src={props.light ? logoLight : logoDark}
          alt="Coffee Wizards Logo"
        />
      </Link>
    </div>
  );
};

export default Logo;

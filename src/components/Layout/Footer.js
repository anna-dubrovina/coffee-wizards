import { Link } from 'react-router-dom';
import IconItem from './IconItem';
import Contacts from './Contacts';
import Input from '../UI/Input';
import Button from '../UI/Button';
import Logo from '../UI/Logo';

import fbIcon from '../../assets/icons/facebook.svg';
import instaIcon from '../../assets/icons/instagram.svg';
import twitterIcon from '../../assets/icons/twitter.svg';
import youtubeIcon from '../../assets/icons/youtube.svg';
import styles from './Footer.module.scss';
import useInput from '../../hooks/useInput';

const Footer = () => {
  const {
    value: enteredEmail,
    invalid: invalidEmail,
    error: emailError,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
  } = useInput('email');

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent + ' container'}>
        <div className={styles.subscribe}>
          <h4>Join our newsletters and get 10% off your first order</h4>
          <form>
            <Input
              type="email"
              id="subscriptionEmail"
              placeholder="Your Email"
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              invalid={invalidEmail}
              errorMsg={emailError}
            />
            <Button type="submit" btnStyle="btnDark">
              Subscribe
            </Button>
          </form>
          <div>
            <h4> Follow us</h4>
            <ul>
              <IconItem link="facebook" icon={fbIcon} external />
              <IconItem link="instagram" icon={instaIcon} external />
              <IconItem link="twitter" icon={twitterIcon} external />
              <IconItem link="youtube" icon={youtubeIcon} external />
            </ul>
          </div>
        </div>
        <div className={styles.info}>
          <h3> Information </h3>
          <ul>
            <li>
              <Link to="/about" exact="true">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/about/contacts">Contacts</Link>
            </li>
            <li>
              <Link to="/about/payment-delivery">Payment & Delivery</Link>
            </li>
            <li>
              <Link to="/about/business"> For Business Clients</Link>
            </li>
          </ul>
        </div>
        <div className={styles.contacts}>
          <h3>Contact Us</h3>
          <Contacts dark />
        </div>
        <div className={styles.logo}>
          <Logo light />
          <p>
            &copy; {new Date().getFullYear()} Anna Dubrovina. All Rights
            Reserved
          </p>
          <span>Icons taken from www.flaticon.com</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

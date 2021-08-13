import { Link } from 'react-router-dom';
import * as vars from '../../shared/globalVars';
import IconItem from './IconItem';
import ShortContacts from './ShortContacts';
import Input from '../UI/Input';
import Button from '../UI/Button';
import Logo from '../UI/Logo';

import fbIcon from '../../assets/icons/facebook.svg';
import instaIcon from '../../assets/icons/instagram.svg';
import twitterIcon from '../../assets/icons/twitter.svg';
import youtubeIcon from '../../assets/icons/youtube.svg';
import styles from './Footer.module.scss';
import useInput from '../../hooks/useInput';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const {
    value: enteredEmail,
    invalid: invalidEmail,
    error: emailError,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(vars.EMAIL_INPUT);

  useEffect(() => {
    let timer;
    if (subscribeSuccess) {
      timer = setTimeout(() => setSubscribeSuccess(false), [3000]);
    }
    return () => clearTimeout(timer);
  }, [subscribeSuccess]);

  const subscribeHandler = (e) => {
    e.preventDefault();
    if (invalidEmail || enteredEmail.trim() === '') {
      return;
    }
    setSubscribeSuccess(true);
    resetEmail();
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent + ' container'}>
        <div className={styles.subscribe}>
          <h4>Join our newsletters and get 10% off your first order</h4>
          {subscribeSuccess && <span>You Were Successfully Subscribed</span>}
          <form onSubmit={subscribeHandler}>
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
            <Button type="submit" btnStyle={vars.BTN_DARK}>
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
              <Link to={vars.ABOUT_MAIN} exact="true">
                About Us
              </Link>
            </li>
            <li>
              <Link to={vars.ABOUT_CONTACTS}>Contacts</Link>
            </li>
            <li>
              <Link to={vars.ABOUT_PAYMENT}>Payment & Delivery</Link>
            </li>
            <li>
              <Link to={vars.ABOUT_BUSINESS}> For Business Clients</Link>
            </li>
          </ul>
        </div>
        <div className={styles.contacts}>
          <h3>Contact Us</h3>
          <ShortContacts dark />
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

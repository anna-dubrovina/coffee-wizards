import { useScrollUp } from '../../hooks/useScrollUp';
import * as vars from '../../shared/globalVars';
import IconItem from '../Layout/IconItem';
import Section from '../Layout/Section';
import Card from '../UI/Card';
import styles from './About.module.scss';

import contactIcon from '../../assets/icons/contact.svg';
import cardIcon from '../../assets/icons/valid.svg';
import suitcaseIcon from '../../assets/icons/suitcase.svg';
import team from '../../assets/img/team.jpg';

const About = () => {
  useScrollUp();
  return (
    <>
      <Section light className={styles.aboutMenu}>
        <ul>
          <IconItem link={vars.ABOUT_CONTACTS} icon={contactIcon}>
            Contact Information
          </IconItem>
          <IconItem link={vars.ABOUT_PAYMENT} icon={cardIcon}>
            Payment & Delivery
          </IconItem>
          <IconItem link={vars.ABOUT_BUSINESS} icon={suitcaseIcon}>
            For Business Clients
          </IconItem>
        </ul>
      </Section>
      <Section className={styles.history}>
        <div className={styles.historyImg}></div>
        <Card>
          <h1> Coffee Wizards Story </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet
            aliquam id diam maecenas ultricies mi.
          </p>
          <p>
            Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit.
            Semper feugiat nibh sed pulvinar proin gravida. Vulputate odio ut
            enim blandit. Interdum velit euismod in pellentesque massa placerat.
            Quis varius quam quisque id diam vel quam elementum.
          </p>
          <p>
            Amet justo donec enim diam vulputate ut pharetra sit amet. Tellus
            rutrum tellus pellentesque eu.
          </p>
        </Card>
      </Section>
      <Section light className={styles.team}>
        <Card cardStyle={vars.CARD_DARK}>
          <h1> Wizards Team</h1>
          <p>
            Pulvinar pellentesque habitant morbi tristique senectus et netus.
            Quisque egestas diam in arcu cursus euismod quis viverra. Adipiscing
            at in tellus integer. Sit amet consectetur adipiscing elit duis.
            Velit egestas dui id ornare.
          </p>
          <img src={team} alt="wizards team" />
        </Card>
      </Section>
    </>
  );
};

export default About;

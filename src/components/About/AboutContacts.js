import { useScrollUp } from '../../hooks/useScrollUp';
import Section from '../Layout/Section';
import Card from '../UI//Card';
import CallbackForm from '../UI//CallbackForm';

import contactIcon from '../../assets/icons/contact.svg';
import feedbackIcon from '../../assets/icons/feedback.svg';
import styles from './AboutContacts.module.scss';

const AboutContacts = () => {
  useScrollUp();
  return (
    <>
      <Section light className={styles.aboutContacts}>
        <Card cardStyle="cardDark">
          <h2>
            <img src={contactIcon} alt="contacts icon" />
            Our Contact Information
          </h2>
          <ul>
            <li>
              <span>Contact Email: </span> coffee@wizards.com
            </li>
            <li>
              <span>Contact Phone : </span> (555) 555 55 55
            </li>
            <li>
              <span>Contacts for business: </span> (111) 111 11 11
            </li>
            <li>
              <span> Address of our office:</span> 123 Teststreet str, CityName
            </li>
            <li>
              <span>Working hours:</span> 10:00 AM – 7:00 PM
            </li>
          </ul>
        </Card>
        <Card cardStyle="cardDark">
          <h2>
            <img src={feedbackIcon} alt="feedback icon" />
            Write us a letter
          </h2>
          <CallbackForm
            title="You can send your request / complaint / suggestion using this form"
            fullForm
          />
        </Card>
      </Section>
    </>
  );
};

export default AboutContacts;

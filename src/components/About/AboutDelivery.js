import { useScrollUp } from '../../hooks/useScrollUp';
import Section from '../Layout/Section';
import Card from '../UI//Card';

import cardIcon from '../../assets/icons/valid.svg';
import deliveryIcon from '../../assets/icons/shipped.svg';
import styles from './AboutSections.module.scss';

const AboutDelivery = () => {
  useScrollUp();
  return (
    <Section className={styles.aboutSections}>
      <h1>Payment & Delivery Conditions</h1>
      <Card>
        <h2>
          <img src={cardIcon} alt="credit card icon" />
          Orders Payment
        </h2>
        <p>
          Lorem ipsum dolor sit amet, ut vel delectus disputando. Cum ne diam
          interesset. Saperet civibus vel ad, putant impetus offendit sit ut.
          Vocibus salutatus imperdiet ex eos.
        </p>
        <p>
          Cum eu debet complectitur. In aperiam aliquid eum, cum consul oblique
          at, possit accumsan cum ad. Ferri imperdiet vix ad, propriae
          reprimique an per, delicata efficiantur ex cum.
        </p>
      </Card>
      <Card>
        <h2>
          <img src={deliveryIcon} alt="credit card icon" />
          Delivery Conditions
        </h2>
        <ul>
          <li>
            <h4>Delivery timeframes</h4>
            <p>
              Unum posidonium et quo. Etiam soluta his id, id vix veritus
              euripidis disputando, probo delicata his eu. Duis detracto vim id,
              falli feugait usu te.
            </p>
          </li>
          <li>
            <h4> Delivery times </h4>
            <p>
              Sapientem abhorreant et qui, te iuvaret abhorreant assueverit eam.
              Omnis tollit invidunt at vis. Id sea erat reprimique. Hinc tempor
              reformidans an quo. Munere diceret reprehendunt ei vis, qui
              delenit consequat cu.
            </p>
          </li>
          <li>
            <h4> Delivery locations </h4>
            <p>
              Labitur prodesset vituperata mei ea, et unum semper fierent pri.
              Pro ei epicurei oporteat, nemore luptatum pri ad. Vis justo
              torquatos cu, vix natum nobis definitiones et. Te nec fuisset
              omnesque, eos harum sanctus eu. Te causae iuvaret assueverit vel,
              eam atqui quando eu.
            </p>
          </li>
        </ul>
      </Card>
      <h3>
        For ordering or obtaining additional information, please contact us by
        phone: (555) 555 55 55
      </h3>
    </Section>
  );
};

export default AboutDelivery;

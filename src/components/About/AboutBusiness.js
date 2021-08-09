import { useScrollUp } from '../../hooks/useScrollUp';
import Section from '../Layout/Section';
import Card from '../UI//Card';
import styles from './AboutSections.module.scss';

import coffeeBeansIcon from '../../assets/icons/beans.svg';
import discountIcon from '../../assets/icons/discount.svg';

const AboutBusiness = () => {
  useScrollUp();

  return (
    <Section className={styles.aboutSections}>
      <h1>Information for business clients</h1>
      <Card>
        <h2>
          <img src={discountIcon} alt="discount icon" />
          Discount for wholesale customers
        </h2>
        <p>
          Lorem ipsum dolor sit amet, ut vel delectus disputando. Cum ne diam
          interesset. Saperet civibus vel ad, putant iSmpetus offendit sit ut.
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
          <img src={coffeeBeansIcon} alt="coffee beans icon" />
          Corporate plans for your employees
        </h2>
        <ul>
          <li>
            <h4>Rent and maintenance of coffee equipment</h4>
            <p>
              Unum posidonium et quo. Etiam soluta his id, id vix veritus
              euripidis disputando, probo delicata his eu. Duis detracto vim id,
              falli feugait usu te.
            </p>
          </li>
          <li>
            <h4> Regular supply of magic coffee </h4>
            <p>
              Sapientem abhorreant et qui, te iuvaret abhorreant assueverit eam.
              Omnis tollit invidunt at vis. Id sea erat reprimique. Hinc tempor
              reformidans an quo. Munere diceret reprehendunt ei vis, qui
              delenit consequat cu.
            </p>
          </li>
          <li>
            <h4> Corporate events in coffee wizarding </h4>
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
        For obtaining additional information, please contact us by phone for
        corporate clients: (111) 111 11 11
      </h3>
    </Section>
  );
};

export default AboutBusiness;

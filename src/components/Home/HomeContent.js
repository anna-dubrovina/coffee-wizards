import ProductsList from '../Products/ProductsList';
import Section from '../Layout/Section';
import styles from './HomeContent.module.scss';

import beansIcon from '../../assets/icons/beans.svg';
import boxIcon from '../../assets/icons/box.svg';
import cezveIcon from '../../assets/icons/cezve.svg';
import coffeeBagIcon from '../../assets/icons/coffee-bag.svg';
import discountIcon from '../../assets/icons/discount.svg';
import machineIcon from '../../assets/icons/machine.svg';
import shippingIcon from '../../assets/icons/shipped.svg';
import starIcon from '../../assets/icons/star.svg';

const advantages = [
  {
    icon: starIcon,
    alt: 'start icon',
    text: 'We select quality beans from top suppliers',
  },
  {
    icon: coffeeBagIcon,
    alt: 'bag icon',
    text: ' We can make original bean mixes and individual roast for you',
  },
  {
    icon: beansIcon,
    alt: 'beans icon',
    text: 'We know what kind of coffee is best for your needs',
  },
  {
    icon: discountIcon,
    alt: 'discount icon',
    text: 'We offer flexible prices and discount for business clients',
  },
  {
    icon: boxIcon,
    alt: 'box icon',
    text: 'We roast on the best equipment and store coffee properly',
  },
  {
    icon: shippingIcon,
    alt: 'shipping icon',
    text: 'We provide free delivery for orders from 5 kg',
  },
  {
    icon: cezveIcon,
    alt: 'cezve icon',
    text: 'We provide test samples of coffee and consultations for everyone',
  },
  {
    icon: machineIcon,
    alt: 'coffee machine icon',
    text: 'We rent and repair coffee equipment',
  },
];

const HomeContent = () => {
  const advantagesList = advantages.map((item) => {
    return (
      <li key={item.alt}>
        <img src={item.icon} alt={item.alt} />
        {item.text}
      </li>
    );
  });

  return (
    <>
      <Section className={styles.topProducts}>
        <h1>Featured Products</h1>
        <ProductsList listType="featured" />
      </Section>
      <Section light className={styles.whyUs}>
        <h1>Why our coffee is magical?</h1>
        <ul>{advantagesList}</ul>
      </Section>
    </>
  );
};

export default HomeContent;

import { useHistory } from 'react-router';
import * as vars from '../../shared/globalVars';
import Section from '../Layout/Section';
import ProductsListSummary from './ProductsListSummary';

const Coffee = () => {
  const history = useHistory();
  const gotoBeansPageHandler = () => history.push(vars.COFFEE_BEANS);
  const gotoGroundPageHandler = () => history.push(vars.COFFEE_GROUND);
  const gotoCapsulesPageHandler = () => history.push(vars.COFFEE_CAPSULES);

  return (
    <>
      <Section light>
        <h1>Coffee Beans</h1>
        <ProductsListSummary
          clicked={gotoBeansPageHandler}
          cardStyle={vars.CARD_DARK}
          subcategory={vars.BEANS}
        />
      </Section>
      <Section>
        <h1> Ground Coffee</h1>
        <ProductsListSummary
          subcategory={vars.GROUND}
          clicked={gotoGroundPageHandler}
          btnStyle={vars.BTN_SEMILIGHT}
        />
      </Section>
      <Section light>
        <h1>Coffee Capsules</h1>
        <ProductsListSummary
          subcategory={vars.CAPSULES}
          clicked={gotoCapsulesPageHandler}
          cardStyle={vars.CARD_DARK}
        />
      </Section>
    </>
  );
};

export default Coffee;

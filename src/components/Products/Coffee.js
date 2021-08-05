import { useHistory } from 'react-router';
import * as vars from '../../shared/globalVars';
import Section from '../Layout/Section';
import ProductsList from './ProductsList';

const Coffee = () => {
  const history = useHistory();
  const gotoBeansPageHandler = () => history.push(vars.COFFEE_BEANS);
  const gotoGroundPageHandler = () => history.push(vars.COFFEE_GROUND);
  const gotoCapsulesPageHandler = () => history.push(vars.COFFEE_CAPSULES);

  return (
    <>
      <Section light>
        <h1>Coffee Beans</h1>
        <ProductsList
          clicked={gotoBeansPageHandler}
          cardStyle="cardDark"
          subcategory={vars.BEANS}
          listType="category"
        />
      </Section>
      <Section>
        <h1> Ground Coffee</h1>
        <ProductsList
          subcategory={vars.GROUND}
          clicked={gotoGroundPageHandler}
          btnStyle="btnSemilight"
          listType="category"
        />
      </Section>
      <Section light>
        <h1>Coffee Capsules</h1>
        <ProductsList
          subcategory={vars.CAPSULES}
          clicked={gotoCapsulesPageHandler}
          cardStyle="cardDark"
          listType="category"
        />
      </Section>
    </>
  );
};

export default Coffee;

import { useHistory } from 'react-router';
import * as vars from '../../shared/globalVars';
import Section from '../Layout/Section';
import ProductsList from './ProductsList';

const Equipment = () => {
  const history = useHistory();
  const gotoMachinesPageHandler = () => history.push(vars.EQUIP_MACHINES);
  const gotoManualPageHandler = () => history.push(vars.EQUIP_MANUAL);
  const gotoGrindersPageHandler = () => history.push(vars.EQUIP_GRINDERS);

  return (
    <>
      <Section light>
        <h1>Coffee Machines</h1>
        <ProductsList
          subcategory={vars.MACHINES}
          clicked={gotoMachinesPageHandler}
          cardStyle="cardDark"
          listType="category"
        />
      </Section>
      <Section>
        <h1> Manual Coffee Makers</h1>
        <ProductsList
          subcategory={vars.MANUAL}
          clicked={gotoManualPageHandler}
          btnStyle="btnSemilight"
          listType="category"
        />
      </Section>
      <Section light>
        <h1> CoffeeGrinders</h1>
        <ProductsList
          subcategory={vars.GRINDERS}
          clicked={gotoGrindersPageHandler}
          cardStyle="cardDark"
          listType="category"
        />
      </Section>
    </>
  );
};

export default Equipment;

import { useHistory } from 'react-router';
import Section from '../../Layout/Section';
import ProductsList from '../ProductsList';

const Equipment = () => {
  const history = useHistory();
  const gotoMachinesPageHandler = () => history.push('/equipment/machines');
  const gotoManualPageHandler = () => history.push('/equipment/manual');
  const gotoGrindersPageHandler = () => history.push('/equipment/grinders');

  return (
    <>
      <Section light>
        <h1>Coffee Machines</h1>
        <ProductsList
          subcategory="machines"
          clicked={gotoMachinesPageHandler}
          cardStyle="cardDark"
          listType="category"
        />
      </Section>
      <Section>
        <h1> Manual Coffee Makers</h1>
        <ProductsList
          subcategory="manual"
          clicked={gotoManualPageHandler}
          btnStyle="btnSemilight"
          listType="category"
        />
      </Section>
      <Section light>
        <h1> CoffeeGrinders</h1>
        <ProductsList
          subcategory="grinders"
          clicked={gotoGrindersPageHandler}
          cardStyle="cardDark"
          listType="category"
        />
      </Section>
    </>
  );
};

export default Equipment;

import { useHistory } from 'react-router';
import Section from '../../Layout/Section';
import ProductsList from '../ProductsList';

const Coffee = () => {
  const history = useHistory();
  const gotoBeansPageHandler = () => history.push('/coffee/beans');
  const gotoGroundPageHandler = () => history.push('/coffee/ground');
  const gotoCapsulesPageHandler = () => history.push('/coffee/capsules');

  return (
    <>
      <Section light>
        <h1>Coffee Beans</h1>
        <ProductsList
          clicked={gotoBeansPageHandler}
          cardStyle="cardDark"
          subcategory="beans"
          listType="category"
        />
      </Section>
      <Section>
        <h1> Ground Coffee</h1>
        <ProductsList
          subcategory="ground"
          clicked={gotoGroundPageHandler}
          btnStyle="btnSemilight"
          listType="category"
        />
      </Section>
      <Section light>
        <h1>Coffee Capsules</h1>
        <ProductsList
          subcategory="capsules"
          clicked={gotoCapsulesPageHandler}
          cardStyle="cardDark"
          listType="category"
        />
      </Section>
    </>
  );
};

export default Coffee;

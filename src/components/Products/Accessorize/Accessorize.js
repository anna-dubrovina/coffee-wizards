import { useHistory } from 'react-router';
import Section from '../../Layout/Section';
import ProductsList from '../ProductsList';

const Accessorize = () => {
  const history = useHistory();
  const gotoCupsPageHandler = () => history.push('/accessorize/cups');
  const gotoToolsPageHandler = () => history.push('/accessorize/tools');

  return (
    <>
      <Section>
        <h1>Coffee Cups</h1>
        <ProductsList
          clicked={gotoCupsPageHandler}
          subcategory="cups"
          btnStyle="btnSemilight"
          listType="category"
        />
      </Section>
      <Section light>
        <h1> Additional Tools</h1>
        <ProductsList
          clicked={gotoToolsPageHandler}
          subcategory="tools"
          cardStyle="cardDark"
          listType="category"
        />
      </Section>
    </>
  );
};

export default Accessorize;

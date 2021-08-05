import { useHistory } from 'react-router';
import * as vars from '../../shared/globalVars';
import Section from '../Layout/Section';
import ProductsList from './ProductsList';

const Accessorize = () => {
  const history = useHistory();
  const gotoCupsPageHandler = () => history.push(vars.ACCS_CUPS);
  const gotoToolsPageHandler = () => history.push(vars.ACCS_TOOLS);

  return (
    <>
      <Section>
        <h1>Coffee Cups</h1>
        <ProductsList
          clicked={gotoCupsPageHandler}
          subcategory={vars.CUPS}
          btnStyle="btnSemilight"
          listType="category"
        />
      </Section>
      <Section light>
        <h1> Additional Tools</h1>
        <ProductsList
          clicked={gotoToolsPageHandler}
          subcategory={vars.TOOLS}
          cardStyle="cardDark"
          listType="category"
        />
      </Section>
    </>
  );
};

export default Accessorize;

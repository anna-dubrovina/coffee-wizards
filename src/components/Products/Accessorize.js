import { useHistory } from 'react-router';
import * as vars from '../../shared/globalVars';
import Section from '../Layout/Section';
import ProductsListSummary from './ProductsListSummary';

const Accessorize = () => {
  const history = useHistory();
  const gotoCupsPageHandler = () => history.push(vars.ACCS_CUPS);
  const gotoToolsPageHandler = () => history.push(vars.ACCS_TOOLS);

  return (
    <>
      <Section>
        <h1>Coffee Cups</h1>
        <ProductsListSummary
          clicked={gotoCupsPageHandler}
          subcategory={vars.CUPS}
          btnStyle={vars.BTN_SEMILIGHT}
        />
      </Section>
      <Section light>
        <h1> Additional Tools</h1>
        <ProductsListSummary
          clicked={gotoToolsPageHandler}
          subcategory={vars.TOOLS}
          cardStyle={vars.CARD_DARK}
        />
      </Section>
    </>
  );
};

export default Accessorize;

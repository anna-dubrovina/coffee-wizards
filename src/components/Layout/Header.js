import { useSelector } from 'react-redux';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { getSubcategoryName } from '../../shared/getSubcategoryName';
import * as vars from '../../shared/globalVars';
import Card from '../UI/Card';
import styles from './Header.module.scss';
import arrowIcon from '../../assets/icons/right-arrow.svg';

const Header = (props) => {
  const { isFound } = useSelector((state) => state.ui);
  const { pathname } = useLocation();
  const { path } = useRouteMatch();
  const { subcategory } = getSubcategoryName(pathname);
  let classes = [styles.header];
  const { productPage } = props;

  switch (path) {
    case '/':
      classes.push(styles.headerHome);
      break;
    case vars.ABOUT_MAIN:
      classes.push(styles.headerAbout);
      break;
    case vars.COFFEE_MAIN:
      classes.push(styles.headerCoffee);
      break;
    case vars.EQUIP_MAIN:
      classes.push(styles.headerEquipment);
      break;
    case vars.ACCS_MAIN:
      classes.push(styles.headerAccessorize);
      break;
    case vars.PRODUCT_MAIN:
      classes.push(styles.headerProduct);
      break;
    default:
      break;
  }

  let headerContent = (
    <>
      <h2>{props.title}</h2>
      <p className="lead">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem hic in
        asperiores corporis deleniti provident. Voluptatibus vel similique ipsum
        quisquam!
      </p>
    </>
  );

  if (subcategory !== '' && !productPage) {
    headerContent = (
      <h4>
        <Link to="/">Home</Link>
        <img src={arrowIcon} alt="right arrow" />
        <Link to={path}>{path.substring(1)}</Link>
        <img src={arrowIcon} alt="right arrow" />
        <span> {subcategory.replace('-', ' & ')}</span>
      </h4>
    );
    classes.push(styles.headerNarrow);
  }

  if (productPage) {
    headerContent = (
      <h4>
        <Link to="/">Home</Link>
        <img src={arrowIcon} alt="right arrow" />
        <Link to={'/' + productPage.category}>{productPage.category}</Link>
        <img src={arrowIcon} alt="right arrow" />
        <Link to={'/' + productPage.category + '/' + productPage.subcategory}>
          {productPage.subcategory}
        </Link>
        <img src={arrowIcon} alt="right arrow" />
        <span> {productPage.title}</span>
      </h4>
    );
    classes.push(styles.headerNarrow);
  }

  return (
    isFound && (
      <header className={classes.join(' ')}>
        <div className={styles.headerContent + ' container'}>
          <Card>
            {headerContent}
            {props.children}
          </Card>
        </div>
      </header>
    )
  );
};

export default Header;

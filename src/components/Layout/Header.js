import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import Card from '../UI/Card';
import styles from './Header.module.scss';
import arrowIcon from '../../assets/icons/right-arrow.svg';
import { getSubcategoryName } from '../../shared/getSubcategoryName';

const Header = (props) => {
  const { pathname } = useLocation();
  const { path } = useRouteMatch();
  const subcategory = getSubcategoryName(pathname);
  let classes = [styles.header];
  const { productPage } = props;

  switch (path) {
    case '/':
      classes.push(styles.headerHome);
      break;
    case '/about':
      classes.push(styles.headerAbout);
      break;
    case '/coffee':
      classes.push(styles.headerCoffee);
      break;
    case '/equipment':
      classes.push(styles.headerEquipment);
      break;
    case '/accessorize':
      classes.push(styles.headerAccessorize);
      break;
    case '/product/:id':
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
    <header className={classes.join(' ')}>
      <div className={styles.headerContent + ' container'}>
        <Card>
          {headerContent}
          {props.children}
        </Card>
      </div>
    </header>
  );
};

export default Header;

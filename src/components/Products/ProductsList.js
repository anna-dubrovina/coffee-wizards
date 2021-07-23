import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useScrollUp } from '../../hooks/useScrollUp';
import { getSubcategoryName } from '../../shared/getSubcategoryName';
import {
  fetchCategoryProducts,
  fetchFeaturedProducts,
  fetchSubcategoryProducts,
} from '../../store/products-actions';
import Button from '../UI/Button';
import Loader from '../UI/Loader';
import ProductItem from './ProductItem';
import styles from './ProductsList.module.scss';

const ProductsList = (props) => {
  const { pathname } = useLocation();
  const subcategoryProducts = useSelector(
    (state) => state.products.subcategoryProducts
  );
  const categoryProducts = useSelector(
    (state) => state.products.categoryProducts
  );
  const featuredProducts = useSelector(
    (state) => state.products.featuredProducts
  );
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();

  const subcategory = getSubcategoryName(pathname);
  useScrollUp();
  let products;

  useEffect(() => {
    switch (props.listType) {
      case 'subcategory':
        dispatch(fetchSubcategoryProducts(subcategory));
        break;
      case 'category':
        dispatch(fetchCategoryProducts(pathname.substring(1)));
        break;
      case 'featured':
        dispatch(fetchFeaturedProducts());
        break;
      default:
        break;
    }
  }, [dispatch, subcategory, pathname, props.listType]);

  switch (props.listType) {
    case 'subcategory':
      products = [...subcategoryProducts];
      break;
    case 'category':
      products = [...categoryProducts];
      break;
    case 'featured':
      products = [...featuredProducts];
      break;
    default:
      break;
  }

  let productsList = <h3>Loading...</h3>;

  if (products.length > 0) {
    if (props.listType === 'category') {
      products = products
        .filter((item) => item.subcategory === props.subcategory)
        .slice(0, 4);
    }
    productsList = products.map((item) => {
      return (
        <ProductItem
          cardStyle={props.cardStyle}
          key={item.id}
          product={item}
          price={item.price || item.size.medium.price}
        />
      );
    });
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className={styles.productsList}>{productsList}</ul>
      )}
      {props.listType === 'category' && (
        <div className={styles.btnWrapper}>
          <Button clicked={props.clicked} btnStyle={props.btnStyle}>
            See More
          </Button>
        </div>
      )}
    </>
  );
};

export default ProductsList;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  fetchCategoryProds,
  fetchFeaturedProds,
} from '../../store/products-actions';
import ProductItem from './ProductItem';
import Button from '../UI/Button';
import Loader from '../UI/Loader';
import styles from './ProductsList.module.scss';

const ProductsListSummary = (props) => {
  const { pathname } = useLocation();
  const { categoryProds, featuredProds } = useSelector(
    (state) => state.products
  );
  const { isLoading } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    props.isFeatured
      ? dispatch(fetchFeaturedProds())
      : dispatch(fetchCategoryProds(pathname.substring(1)));
  }, [dispatch, pathname, props.isFeatured]);

  const categoryProdsSummary = categoryProds
    .filter((item) => item.subcategory === props.subcategory)
    .slice(0, 4);

  let products = props.isFeatured
    ? [...featuredProds]
    : [...categoryProdsSummary];

  let productsList = [];
  if (products.length > 0) {
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

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <ul className={styles.productsList + ' ' + styles.productsListSummary}>
        {productsList}
      </ul>
      <div className={styles.btnWrapper}>
        <Button clicked={props.clicked} btnStyle={props.btnStyle}>
          See More
        </Button>
      </div>
    </>
  );
};

export default ProductsListSummary;

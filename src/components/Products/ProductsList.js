import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useScrollUp } from '../../hooks/useScrollUp';
import { getSubcategoryName } from '../../shared/getSubcategoryName';
import {
  fetchCategoryProducts,
  fetchFeaturedProducts,
  fetchSubcategoryProducts,
} from '../../store/products-actions';
import ProductItem from './ProductItem';
import SortingBar from './SotrtingBar';
import Section from '../Layout/Section';
import Button from '../UI/Button';
import Loader from '../UI/Loader';
import styles from './ProductsList.module.scss';
import FiltersBar from './FiltersBar';

const getPages = (array) => {
  const remainder = array.length % 6;
  const withoutReminder = parseInt(array.length / 6);
  const pages = remainder === 0 ? withoutReminder : withoutReminder + 1;
  return pages;
};

const ProductsList = (props) => {
  useScrollUp();
  const { pathname } = useLocation();
  const [listPage, setListPage] = useState(1);
  const { subcategoryProducts, categoryProducts, featuredProducts } =
    useSelector((state) => state.products);
  const { isLoading } = useSelector((state) => state.ui);
  const [sortedProducts, setSortedProducts] = useState(subcategoryProducts);
  const dispatch = useDispatch();
  const { subcategory } = getSubcategoryName(pathname);

  useEffect(() => {
    props.listType === 'subcategory' &&
      dispatch(fetchSubcategoryProducts(subcategory));
    props.listType === 'category' &&
      dispatch(fetchCategoryProducts(pathname.substring(1)));

    props.listType === 'featured' && dispatch(fetchFeaturedProducts());
  }, [dispatch, subcategory, pathname, props.listType]);

  useEffect(() => {
    props.listType === 'subcategory' &&
      setSortedProducts([...subcategoryProducts]);
  }, [subcategoryProducts, props.listType]);

  const changePageHandler = (page) => setListPage(page);

  let products =
    props.listType === 'subcategory'
      ? [...subcategoryProducts]
      : props.listType === 'category'
      ? [...categoryProducts]
      : [...featuredProducts];

  const pagesList = [];
  if (props.listType === 'subcategory') {
    const pages = getPages(products);
    for (let i = 0; i < pages; i++) {
      const page = (
        <li
          key={i}
          onClick={changePageHandler.bind(null, i + 1)}
          className={listPage === i + 1 ? styles.current : ''}
        >
          {i + 1}
        </li>
      );
      pagesList.push(page);
    }
  }

  const sortHandler = (sort) => {
    const sorted = sort(products);
    setSortedProducts([...sorted]);
  };
  const reverseHandler = () => {
    setSortedProducts((curState) => {
      const updatedState = [...curState];
      return updatedState.reverse();
    });
  };

  let productsList = [];
  if (products.length > 0) {
    if (props.listType === 'category') {
      products = products
        .filter((item) => item.subcategory === props.subcategory)
        .slice(0, 4);
    }
    if (props.listType === 'subcategory') {
      const startIndex = 0 + 6 * (listPage - 1);
      const endIndex = 5 + 6 * (listPage - 1);
      productsList = sortedProducts.map((item, index) => {
        if (index < startIndex || index > endIndex) {
          return null;
        }
        return (
          <ProductItem
            cardStyle={props.cardStyle}
            key={item.id}
            product={item}
            price={item.price || item.size.medium.price}
          />
        );
      });
    } else {
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
  }

  return isLoading ? (
    <Loader />
  ) : props.listType === 'subcategory' ? (
    <Section className="page-with-aside">
      <FiltersBar products={products} />
      <div>
        <SortingBar sort={sortHandler} reverse={reverseHandler} />
        <ul className={styles.productsList}>{productsList}</ul>
        {products.length > 6 && (
          <div className={styles.btnWrapper}>
            <Button>Show More</Button>
          </div>
        )}
        <ul className={styles.pagesList}>{pagesList} </ul>
      </div>
    </Section>
  ) : (
    <>
      <ul className={styles.productsList + ' ' + styles.categoryList}>
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

export default ProductsList;

import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useScrollUp } from '../../hooks/useScrollUp';
import { getSubcategoryName } from '../../shared/getSubcategoryName';
import { fetchSubcategoryProds } from '../../store/products-actions';
import FiltersBar from './FiltersBar';
import ProductItem from './ProductItem';
import SortingBar from './SotrtingBar';
import Section from '../Layout/Section';
import Button from '../UI/Button';
import Loader from '../UI/Loader';
import styles from './ProductsList.module.scss';

const getPages = (array) => {
  const remainder = array.length % 6;
  const withoutReminder = parseInt(array.length / 6);
  const pages = remainder === 0 ? withoutReminder : withoutReminder + 1;
  return pages;
};

const ProductsListFull = () => {
  useScrollUp();
  const { pathname } = useLocation();
  const [listPage, setListPage] = useState(1);
  const products = useSelector((state) => state.products.subcategoryProds);
  const { isLoading } = useSelector((state) => state.ui);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);

  const dispatch = useDispatch();
  const { subcategory } = getSubcategoryName(pathname);
  const pages = getPages(products);

  useEffect(
    () => dispatch(fetchSubcategoryProds(subcategory)),
    [dispatch, subcategory]
  );
  useEffect(() => setFilteredProducts([...products]), [products]);
  useEffect(() => setSortedProducts([...filteredProducts]), [filteredProducts]);

  const filterHandler = useCallback(
    (filters) => {
      if (filters.length === 0) {
        setFilteredProducts([...products]);
      }
      for (const filterItem of filters) {
        setFilteredProducts((curState) => {
          const updatedState = [...curState];
          const updatedFilteredProducts = updatedState.filter(
            (item) => item[filterItem.filterName] === filterItem.filterValue
          );
          return updatedFilteredProducts;
        });
      }
    },
    [products]
  );

  const sortHandler = (sort) => setSortedProducts([...sort(products)]);
  const reverseHandler = () => {
    setSortedProducts((curState) => {
      const updatedState = [...curState];
      return updatedState.reverse();
    });
  };
  const changePageHandler = (page) => setListPage(page);

  const pagesList = [];
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

  let productsList = [];
  if (products.length > 0) {
    const startIndex = 0 + 6 * (listPage - 1);
    const endIndex = 5 + 6 * (listPage - 1);
    productsList = sortedProducts.map((item, index) => {
      if (index < startIndex || index > endIndex) {
        return null;
      }
      return (
        <ProductItem
          key={item.id}
          product={item}
          price={item.price || item.size.medium.price}
        />
      );
    });
  }

  return (
    <Section className="page-with-aside">
      <FiltersBar
        products={products}
        loading={isLoading}
        filter={filterHandler}
      />
      {isLoading && <Loader />}
      {!isLoading && (
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
      )}
    </Section>
  );
};

export default ProductsListFull;

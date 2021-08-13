import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useScrollUp } from '../../hooks/useScrollUp';
import { getSubcategoryName } from '../../shared/getSubcategoryName';
import { fetchSubcategoryProds } from '../../store/products-actions';
import { filtersActions } from '../../store/filters-slice';
import * as vars from '../../shared/globalVars';
import FiltersBar from './FiltersBar';
import ProductItem from './ProductItem';
import SortingBar from './SotrtingBar';
import Section from '../Layout/Section';
import Button from '../UI/Button';
import Card from '../UI/Card';
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
  const products = useSelector((state) => state.products.subcategoryProds);
  const { checkedFilters } = useSelector((state) => state.filters);
  const { isLoading } = useSelector((state) => state.ui);
  const [listPage, setListPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [beansWeight, setBeansWeight] = useState(vars.PROD_SIZE_M);
  const { pathname } = useLocation();
  const { subcategory } = getSubcategoryName(pathname);
  const dispatch = useDispatch();
  const pages = getPages(sortedProducts);

  const filterByPrice = (min, max) => {
    setFilteredProducts((curState) => {
      const updatedFilteredProds = [...curState];
      const filteredByPrice = updatedFilteredProds.filter((item) => {
        const productPrice = item.price
          ? item.price
          : item.size[beansWeight].price;
        return (productPrice >= min) & (productPrice <= max);
      });
      return filteredByPrice;
    });
  };

  const getBeansWeightHandler = (weight) => setBeansWeight(weight);
  const sortHandler = (sort) => setSortedProducts([...sort(filteredProducts)]);
  const reverseHandler = () => {
    setSortedProducts((curState) => {
      const updatedState = [...curState];
      return updatedState.reverse();
    });
  };
  const changePageHandler = (page) => setListPage(page);

  useEffect(
    () => dispatch(fetchSubcategoryProds(subcategory)),
    [dispatch, subcategory]
  );

  useEffect(() => {
    if (checkedFilters.length === 0) {
      setFilteredProducts([...products]);
      return;
    }
    let allFittingProds = [];
    for (const filterItem of checkedFilters) {
      let fittingProdsPerFilter = [];
      const arrayBeFiltered =
        allFittingProds.length === 0 ? products : allFittingProds;
      for (let i = 0; i < arrayBeFiltered.length; i++) {
        const concatFittingProds = fittingProdsPerFilter.concat(
          arrayBeFiltered.filter(
            (item) => item[filterItem.filterName] === filterItem.values[i]
          )
        );
        fittingProdsPerFilter = concatFittingProds;
      }
      allFittingProds = fittingProdsPerFilter;
    }
    setFilteredProducts(allFittingProds);
  }, [products, checkedFilters, subcategory]);

  useEffect(() => setSortedProducts([...filteredProducts]), [filteredProducts]);

  useEffect(
    () => dispatch(filtersActions.clearFilters()),
    [subcategory, dispatch]
  );

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
  if (sortedProducts.length > 0) {
    const startIndex = 0 + 6 * (listPage - 1);
    const endIndex = 5 + 6 * (listPage - 1);
    productsList = sortedProducts.map((item, index) => {
      if (index < startIndex || index > endIndex) {
        return null;
      }
      const productPrice = item.price
        ? item.price
        : item.size[beansWeight].price;
      const productSize =
        typeof item.size === 'object'
          ? item.size[beansWeight].weight
          : item.size;

      return (
        <ProductItem
          key={item.id}
          product={item}
          price={productPrice}
          size={productSize}
        />
      );
    });
  }

  return (
    <Section className="page-with-aside">
      <FiltersBar
        products={products}
        filteredProds={filteredProducts}
        loading={isLoading}
        priceFilter={filterByPrice}
        beansWeight={beansWeight}
        getBeansWeight={getBeansWeightHandler}
      />
      {isLoading && <Loader />}
      {!isLoading && (
        <div className={styles.productsListContent}>
          <SortingBar sort={sortHandler} reverse={reverseHandler} />
          {sortedProducts.length === 0 ? (
            <Card className={styles.noProds}>
              <h3> Unfortunately, there is no products for your request.</h3>
              <p>You can change filters to see more products.</p>
            </Card>
          ) : (
            <>
              <ul className={styles.productsList}>{productsList}</ul>
              {sortedProducts.length > 6 && (
                <div className={styles.btnWrapper}>
                  <Button>Show More</Button>
                </div>
              )}
              <ul className={styles.pagesList}>{pagesList} </ul>
            </>
          )}
        </div>
      )}
    </Section>
  );
};

export default ProductsListFull;

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
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
import { useQuery } from '../../hooks/useQuery';

const getPages = (array) => {
  const remainder = array.length % 6;
  const withoutReminder = parseInt(array.length / 6);
  const pages = remainder === 0 ? withoutReminder : withoutReminder + 1;
  return pages;
};

const ProductsListFull = () => {
  useScrollUp();
  const { pathname, search } = useLocation();
  const products = useSelector((state) => state.products.subcategoryProds);
  const { checkedFilters, filtersParams } = useSelector(
    (state) => state.filters
  );
  const { isLoading } = useSelector((state) => state.ui);
  const [listPage, setListPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [beansWeight, setBeansWeight] = useState(vars.PROD_SIZE_M);
  const [searchParams, setSearchParams] = useState({});
  const { subcategory } = getSubcategoryName(pathname);
  const dispatch = useDispatch();
  const pages = getPages(sortedProducts);
  const history = useHistory();
  const query = useQuery();
  const queryParams = useMemo(() => {
    return {};
  }, []);
  for (const entry of query.entries()) {
    queryParams[entry[0]] = entry[1];
  }

  const getBeansWeightHandler = (weight) => setBeansWeight(weight);

  const sortHandler = useCallback(
    (sort, mode) => {
      setSortedProducts([...sort(filteredProducts)]);
      if (mode !== queryParams.sort) {
        console.log(mode, queryParams.sort);
        setSearchParams((curState) => {
          const updatedState = { ...curState, sort: mode };
          return updatedState;
        });
      }
    },
    [filteredProducts, queryParams.sort]
  );

  const reverseHandler = useCallback(
    (mode) => {
      setSortedProducts((curState) => {
        const updatedState = [...curState];
        return updatedState.reverse();
      });
      if (mode !== queryParams.order) {
        setSearchParams((curState) => {
          const updatedState = { ...curState, order: mode };
          return updatedState;
        });
      }
    },
    [queryParams.order]
  );

  const changePageHandler = (page) => {
    setListPage(page);
    setSearchParams((curState) => {
      const updatedState = { ...curState, page };
      return updatedState;
    });
  };

  useEffect(
    () => dispatch(fetchSubcategoryProds(subcategory)),
    [dispatch, subcategory]
  );

  useEffect(() => {
    if (
      JSON.stringify(queryParams) !== '{}' &&
      JSON.stringify(searchParams) === '{}'
    ) {
      let params = [];
      for (const key in queryParams) {
        if (key === 'page') {
          changePageHandler(+queryParams.page);
          continue;
        }
        if (key === 'sort') {
          setSearchParams((curState) => {
            const updatedState = { ...curState, sort: queryParams[key] };
            return updatedState;
          });
          continue;
        }
        if (key === 'order') {
          setSearchParams((curState) => {
            const updatedState = { ...curState, order: queryParams[key] };
            return updatedState;
          });
          continue;
        }
        const param = { paramName: key, paramValue: queryParams[key] };
        params.push(param);
      }

      dispatch(filtersActions.setFilters(params));
    } else {
      let search = '?';
      for (const key in searchParams) {
        if (key !== 'filters') {
          search += `${key}=${searchParams[key]}&`;
        } else {
          for (let i = 0; i < searchParams.filters.length; i++) {
            const item = searchParams.filters[i];
            search += `${item.paramName}=${item.paramValue}&`;
          }
        }
      }
      search = search.substring(0, search.length - 1);
      history.push({ search });
    }
  }, [searchParams, history, queryParams, dispatch, reverseHandler]);

  useEffect(() => {
    if (filtersParams.length === 0) {
      setSearchParams((curState) => {
        const updatedState = { ...curState };
        delete updatedState.filters;
        return updatedState;
      });
    } else {
      setSearchParams((curState) => {
        const updatedState = {
          ...curState,
          filters: filtersParams,
          page: 1,
          order: 'asc',
          sort: 'default',
        };
        return updatedState;
      });
      setListPage(1);
    }
  }, [filtersParams]);

  useEffect(() => {
    if (checkedFilters.length === 0) {
      setFilteredProducts([...products]);
      return;
    }
    let allFittingProds = [];
    for (const filterItem of checkedFilters) {
      let fittingProdsPerFilter = [];
      const prodsBeFiltered =
        allFittingProds.length === 0 ? products : allFittingProds;

      if (filterItem.filterName === 'price') {
        const [min, max] = filterItem.values[0].split('-');
        const filteredByPrice = prodsBeFiltered.filter((item) => {
          const productPrice = item.price
            ? item.price
            : item.size[beansWeight].price;
          return (productPrice >= min) & (productPrice <= max);
        });
        fittingProdsPerFilter = filteredByPrice;
      } else {
        for (let i = 0; i < filterItem.values.length; i++) {
          const concatFittingProds = fittingProdsPerFilter.concat(
            prodsBeFiltered.filter(
              (item) => item[filterItem.filterName] === filterItem.values[i]
            )
          );
          fittingProdsPerFilter = concatFittingProds;
        }
      }
      allFittingProds = fittingProdsPerFilter;
    }
    setFilteredProducts(allFittingProds);
    // setSearchParams((curState) => {
    //   const updatedState = { ...curState, order: 'asc' };
    //   return updatedState;
    // });
  }, [products, checkedFilters, subcategory, beansWeight]);

  useEffect(() => setSortedProducts([...filteredProducts]), [filteredProducts]);

  useEffect(() => {
    if (search === '') {
      dispatch(filtersActions.clearFilters());
      setSearchParams((curState) => {
        const updatedState = { ...curState, page: 1 };
        delete updatedState.filters;
        return updatedState;
      });
    }
  }, [search, dispatch]);

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
        // filteredProds={filteredProducts}
        loading={isLoading}
        beansWeight={beansWeight}
        getBeansWeight={getBeansWeightHandler}
      />
      {isLoading && <Loader />}
      {!isLoading && (
        <div className={styles.productsListContent}>
          <SortingBar
            sort={sortHandler}
            reverse={reverseHandler}
            sortParam={queryParams.sort}
            orderParam={queryParams.order}
          />
          {sortedProducts.length === 0 ? (
            <Card className={styles.noProds}>
              <h3> Unfortunately, there is no products for your request.</h3>
              <p>You can change filters to see more products.</p>
            </Card>
          ) : (
            <>
              <ul className={styles.productsList}>{productsList}</ul>
              {/* {sortedProducts.length > 6 && (
                <div className={styles.btnWrapper}>
                  <Button>Show More</Button>
                </div>
              )} */}
              <ul className={styles.pagesList}>{pagesList} </ul>
            </>
          )}
        </div>
      )}
    </Section>
  );
};

export default ProductsListFull;

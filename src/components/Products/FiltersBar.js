import { useLocation } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import { getSubcategoryName } from '../../shared/getSubcategoryName';
import { useDispatch } from 'react-redux';
import { filtersActions } from '../../store/filters-slice';
import * as vars from '../../shared/globalVars';
import FilterList from './FilterList';
import Button from '../UI/Button';
import Input from '../UI/Input';
import styles from './FiltersBar.module.scss';
import Card from '../UI/Card';
import Loader from '../UI/Loader';
import Select from '../UI/Select';
import { useState } from 'react';

const getMinMaxPrice = (list, size) => {
  if (list.length === 0) {
    return [null, null];
  }
  let priceList = [];
  if (list[0].price) {
    priceList = list.map((item) => item.price);
  } else {
    const sizeObjList = list.map((item) => item.size);
    sizeObjList.forEach((item) => {
      for (const key in item) {
        if (key === size) {
          priceList.push(item[key].price);
        }
      }
    });
  }
  priceList.sort((a, b) => (a > b ? 1 : -1));
  const minPrice = parseInt(priceList[0]);
  const maxPrice = parseInt(priceList[priceList.length - 1]) + 1;
  return [minPrice, maxPrice];
};

const FiltersBar = (props) => {
  const [showFilters, setShowFilters] = useState(false);
  const { pathname } = useLocation();
  const { category, subcategory } = getSubcategoryName(pathname);
  const [minPrice, maxPrice] = getMinMaxPrice(
    props.products,
    props.beansWeight
  );
  const dispatch = useDispatch();

  const {
    value: enteredMinPrice,
    invalid: invalidMinPrice,
    error: minPriceError,
    changeHandler: minPriceChangeHandler,
    blurHandler: minPriceBlurHandler,
  } = useInput(vars.PRICE_INPUT, minPrice);

  const {
    value: enteredMaxPrice,
    invalid: invalidMaxPrice,
    error: maxPriceError,
    changeHandler: maxPriceChangeHandler,
    blurHandler: maxPriceBlurHandler,
  } = useInput(vars.PRICE_INPUT, maxPrice);

  const toggleFiltersHandler = () => setShowFilters((curState) => !curState);

  const resetFiltersHandler = () => dispatch(filtersActions.clearFilters());
  const getBeansWeight = (value) => {
    let size = vars.PROD_SIZE_M;
    if (value === vars.WEIGHT_S) {
      size = vars.PROD_SIZE_S;
    } else if (value === vars.WEIGHT_L) {
      size = vars.PROD_SIZE_L;
    }
    props.getBeansWeight(size);
  };

  const filterByPriceHandler = (e) => {
    e.preventDefault();
    if (
      enteredMinPrice < minPrice ||
      invalidMinPrice ||
      enteredMinPrice.toString().trim() === '' ||
      enteredMaxPrice > maxPrice ||
      invalidMaxPrice ||
      enteredMaxPrice.toString().trim() === ''
    ) {
      return;
    }
    dispatch(
      filtersActions.addFilter({
        filterName: 'price',
        filterValue: `${enteredMinPrice}-${enteredMaxPrice}`,
      })
    );
  };

  let filters = [];

  if (props.products.length > 0) {
    if (category === vars.COFFEE) {
      const arabicaFilter = (
        <FilterList
          key={vars.PROD_ARABICA}
          property={vars.PROD_ARABICA}
          products={props.products}
        />
      );
      const sournessFilter = (
        <FilterList
          key={vars.PROD_SOURNESS}
          property={vars.PROD_SOURNESS}
          products={props.products}
        />
      );
      const swetnessFilter = (
        <FilterList
          key={vars.PROD_SWEETNESS}
          property={vars.PROD_SWEETNESS}
          products={props.products}
        />
      );
      const strengthFilter = (
        <FilterList
          key={vars.PROD_STRENGTH}
          property={vars.PROD_STRENGTH}
          products={props.products}
        />
      );

      filters.push(
        arabicaFilter,
        sournessFilter,
        swetnessFilter,
        strengthFilter
      );
    }

    if (subcategory === vars.MACHINES) {
      const brandFilter = (
        <FilterList
          key={vars.PROD_BRAND}
          property={vars.PROD_BRAND}
          products={props.products}
        />
      );
      const typeFilter = (
        <FilterList
          key={vars.PROD_TYPE}
          property={vars.PROD_TYPE}
          products={props.products}
        />
      );
      filters.push(brandFilter, typeFilter);
    }

    if (subcategory === vars.MACHINES || subcategory === vars.GRINDERS) {
      const warrantyFilter = (
        <FilterList
          key={vars.PROD_WARRANTY}
          property={vars.PROD_WARRANTY}
          products={props.products}
        />
      );
      filters.push(warrantyFilter);
    }

    if (
      subcategory === vars.MANUAL ||
      subcategory === vars.GRINDERS ||
      category === vars.ACCS
    ) {
      const materialFilter = (
        <FilterList
          key={vars.PROD_MATERIAL}
          property={vars.PROD_MATERIAL}
          products={props.products}
        />
      );
      filters.push(materialFilter);
    }

    if (subcategory !== vars.MACHINES && subcategory !== vars.BEANS) {
      const sizeFilter = (
        <FilterList
          key={vars.PROD_SIZE}
          property={vars.PROD_SIZE}
          products={props.products}
        />
      );
      filters.push(sizeFilter);
    }

    if (subcategory === vars.BEANS) {
      const beansWeigthFilter = (
        <Card key={vars.PROD_SIZE} className={styles.weightFilter}>
          <h4>Weight Options</h4>
          <Select
            options={[vars.WEIGHT_M, vars.WEIGHT_S, vars.WEIGHT_L]}
            getValue={getBeansWeight}
          />
        </Card>
      );
      filters.push(beansWeigthFilter);
    }

    const priceFilter = (
      <Card key={vars.PROD_PRICE} className={styles.priceFilter}>
        <h4>Price</h4>
        <form onSubmit={filterByPriceHandler}>
          <div>
            <Input
              type="number"
              min={minPrice}
              max={maxPrice}
              id="minPrice"
              onChange={minPriceChangeHandler}
              onBlur={minPriceBlurHandler}
              errorMsg={minPriceError}
              invalid={invalidMinPrice}
              value={enteredMinPrice}
            />
            <Input
              type="number"
              min={minPrice}
              max={maxPrice}
              id="maxPrice"
              onChange={maxPriceChangeHandler}
              onBlur={maxPriceBlurHandler}
              errorMsg={maxPriceError}
              invalid={invalidMaxPrice}
              value={enteredMaxPrice}
            />
          </div>
          <Button submit btnStyle={vars.BTN_SEMILIGHT}>
            OK
          </Button>
        </form>
      </Card>
    );

    filters.push(priceFilter);
  }

  const filterBarClasses = [styles.filterBar];
  if (!showFilters) {
    filterBarClasses.push(styles.hidden);
  }

  return (
    <aside className={styles.filtersAside}>
      <div className={styles.filterBtn}>
        <Button btnStyle={vars.BTN_MAIN} clicked={toggleFiltersHandler}>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>
      <div className={filterBarClasses.join(' ')}>
        {props.loading ? <Loader /> : filters}
        <Button btnStyle={vars.BTN_DARK} clicked={resetFiltersHandler}>
          Reset Filters
        </Button>
      </div>
    </aside>
  );
};

export default FiltersBar;

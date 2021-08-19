import { useCallback, useEffect, useState } from 'react';
import { BEANS } from '../../shared/globalVars';
import styles from './SortingBar.module.scss';

const arrowUp = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    width="20"
    height="20"
    x="0"
    y="0"
    viewBox="0 0 240.835 240.835"
    style={{ enableBackground: 'new 0 0 20 20' }}
    xmlSpace="preserve"
  >
    <path
      id="Expand_Less"
      d="M129.007,57.819c-4.68-4.68-12.499-4.68-17.191,0L3.555,165.803c-4.74,4.74-4.74,12.427,0,17.155   c4.74,4.74,12.439,4.74,17.179,0l99.683-99.406l99.671,99.418c4.752,4.74,12.439,4.74,17.191,0c4.74-4.74,4.74-12.427,0-17.155   L129.007,57.819z"
    />
  </svg>
);
const arrowDown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    width="20"
    height="20"
    x="0"
    y="0"
    viewBox="0 0 330 330"
    style={{ enableBackground: 'new 0 0 20 20' }}
    xmlSpace="preserve"
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      id="XMLID_225_"
      d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
    />
  </svg>
);

const DEFAULT_MODE = 'default',
  NAME_MODE = 'name',
  PRICE_MODE = 'price',
  ASC_MODE = 'asc',
  DESC_MODE = 'desc';

const SortingBar = (props) => {
  const { sort, reverse, sortParam, orderParam } = props;
  const [sortingMode, setSortingMode] = useState(DEFAULT_MODE);
  const [orderMode, setOrderMode] = useState(ASC_MODE);

  const sortByDefault = (array) => array;
  const sortByName = (array) =>
    array.sort((firstEl, secondEl) =>
      firstEl.title < secondEl.title ? -1 : 1
    );
  const sortByPrice = (array) => {
    return array.sort((firstEl, secondEl) => {
      if (firstEl.subcategory === BEANS) {
        return firstEl.size.medium.price < secondEl.size.medium.price ? -1 : 1;
      }
      return firstEl.price < secondEl.price ? -1 : 1;
    });
  };

  const sortHandler = useCallback(
    (mode, event) => {
      setSortingMode(mode);
      let sortFunction = sortByDefault;
      if (mode === NAME_MODE) {
        sortFunction = sortByName;
      } else if (mode === PRICE_MODE) {
        sortFunction = sortByPrice;
      }
      sort(sortFunction, mode);
      if (orderMode === DESC_MODE && event) {
        reverse(DESC_MODE);
      }
    },
    [sort, orderMode, reverse]
  );

  const orderHandler = useCallback(
    (mode) => {
      if (orderMode === mode) {
        return;
      }
      setOrderMode(mode);
      reverse(mode);
    },
    [reverse, orderMode]
  );

  useEffect(() => {
    if (sortParam !== sortingMode && sortParam) {
      sortHandler(sortParam);
    }
  }, [sortParam, sortingMode, sortHandler]);

  useEffect(() => {
    let timer;
    if (orderParam !== orderMode && orderParam) {
      timer = setTimeout(() => orderHandler(orderParam), [100]);
    }
    return () => clearTimeout(timer);
  }, [orderParam, orderMode, orderHandler]);

  return (
    <div className={styles.sortingBar}>
      <span>Sort By:</span>
      <ul>
        <li
          onClick={sortHandler.bind(null, DEFAULT_MODE)}
          className={sortingMode === DEFAULT_MODE ? styles.selected : ''}
        >
          Default
        </li>
        <li
          onClick={sortHandler.bind(null, NAME_MODE)}
          className={sortingMode === NAME_MODE ? styles.selected : ''}
        >
          Name
        </li>
        <li
          onClick={sortHandler.bind(null, PRICE_MODE)}
          className={sortingMode === PRICE_MODE ? styles.selected : ''}
        >
          Price
        </li>
        <li
          onClick={orderHandler.bind(null, ASC_MODE)}
          className={orderMode === ASC_MODE ? styles.selected : ''}
        >
          {arrowUp}
        </li>
        <li
          onClick={orderHandler.bind(null, DESC_MODE)}
          className={orderMode === DESC_MODE ? styles.selected : ''}
        >
          {arrowDown}
        </li>
      </ul>
    </div>
  );
};

export default SortingBar;

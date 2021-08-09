import { useState } from 'react';
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
  PRICE_MODE = 'price';

const SortingBar = (props) => {
  const [sortingMode, setSortingMode] = useState(DEFAULT_MODE);
  const [isAsc, setIsAsc] = useState(true);

  const sortByDefault = (array) => array;

  const sortByName = (array) => {
    return array.sort((firstEl, secondEl) =>
      firstEl.title < secondEl.title ? -1 : 1
    );
  };
  const sortByPrice = (array) => {
    return array.sort((firstEl, secondEl) => {
      if (firstEl.subcategory === BEANS) {
        return firstEl.size.medium.price < secondEl.size.medium.price ? -1 : 1;
      }
      return firstEl.price < secondEl.price ? -1 : 1;
    });
  };

  const sortByDefaultHandler = () => {
    setSortingMode(DEFAULT_MODE);
    props.sort(sortByDefault);
  };
  const sortByNameHandler = () => {
    setSortingMode(NAME_MODE);
    props.sort(sortByName);
  };
  const sortByPriceHandler = () => {
    setSortingMode(PRICE_MODE);
    props.sort(sortByPrice);
  };
  const ascHandler = () => {
    if (isAsc) {
      return;
    }
    setIsAsc(true);
    props.reverse();
  };

  const descHandler = () => {
    if (!isAsc) {
      return;
    }
    setIsAsc(false);
    props.reverse();
  };

  return (
    <div className={styles.sortingBar}>
      <span>Sort By:</span>
      <ul>
        <li
          onClick={sortByDefaultHandler}
          className={sortingMode === DEFAULT_MODE ? styles.selected : ''}
        >
          Default
        </li>
        <li
          onClick={sortByNameHandler}
          className={sortingMode === NAME_MODE ? styles.selected : ''}
        >
          Name
        </li>
        <li
          onClick={sortByPriceHandler}
          className={sortingMode === PRICE_MODE ? styles.selected : ''}
        >
          Price
        </li>
        <li onClick={ascHandler} className={isAsc ? styles.selected : ''}>
          {arrowUp}
        </li>
        <li onClick={descHandler} className={!isAsc ? styles.selected : ''}>
          {arrowDown}
        </li>
      </ul>
    </div>
  );
};

export default SortingBar;

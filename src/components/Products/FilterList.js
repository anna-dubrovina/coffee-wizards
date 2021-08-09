import * as vars from '../../shared/globalVars';
import Checkbox from '../UI/Checkbox';
import Card from '../UI/Card';
import styles from './FilterList.module.scss';

const getFilterList = (list, property) => {
  let propertyList = [];
  if (typeof list[0][property] === 'object') {
    const sizeObjList = list.map((item) => item[property]);
    sizeObjList.forEach((item) => {
      for (const key in item) {
        propertyList.push(item[key].weight);
      }
    });
  } else {
    propertyList = list.map((item) => item[property]);
  }
  const filterList = propertyList
    .filter((item, pos) => propertyList.indexOf(item) === pos)
    .sort((a, b) => (a > b ? 1 : -1));
  return filterList;
};

const FilterList = (props) => {
  const { property, filter, products } = props;

  const toggleFilterHandler = (item, isChecked) => {
    const action = isChecked ? vars.ADD : vars.DELETE;
    filter(property, item, action);
  };

  const filterList = getFilterList(products, property).map((item, index) => {
    return (
      <li key={index}>
        <Checkbox
          getCheckedStatus={toggleFilterHandler.bind(null, item)}
          id={item}
          label={item}
        />
      </li>
    );
  });
  return (
    <Card className={styles.filterList}>
      <h4>{property}</h4>
      <ul>{filterList}</ul>
    </Card>
  );
};

export default FilterList;

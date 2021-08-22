import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtersActions } from '../../store/filters-slice';
import Checkbox from '../UI/Checkbox';

const FilterItem = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const { checkedFilters } = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const toggleFilterHandler = (filterValue) => {
    setIsChecked((curState) => !curState);
    !isChecked
      ? dispatch(
          filtersActions.addFilter({
            filterName: props.filterName,
            filterValue,
          })
        )
      : dispatch(filtersActions.deleteFilter({ filterValue }));
  };

  useEffect(() => {
    checkedFilters.forEach((item) => {
      for (let i = 0; i < item.values.length; i++) {
        if (
          (item.values[i] === props.filterValue ||
            +item.values[i] === props.filterValue) &&
          item.filterName === props.filterName
        ) {
          setIsChecked(true);
        }
      }
    });
    checkedFilters.length === 0 && setIsChecked(false);
  }, [checkedFilters, props.filterValue, props.filterName]);

  return (
    <li onClick={toggleFilterHandler.bind(null, props.filterValue)}>
      <Checkbox
        id={props.filterValue}
        label={props.filterValue}
        checked={isChecked}
        readOnly
      />
    </li>
  );
};

export default FilterItem;

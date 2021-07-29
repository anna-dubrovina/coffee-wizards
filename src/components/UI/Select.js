import { useCallback, useEffect, useRef, useState } from 'react';
import arrowDown from '../../assets/icons/arrow-down.svg';
import arrowUp from '../../assets/icons/arrow-up.svg';
import styles from './Select.module.scss';

const Select = (props) => {
  const [selectedOption, setSelectedOption] = useState(props.options[0]);
  const [showOptions, setShowOptions] = useState(false);
  const select = useRef(null);

  const toggleOptionsHanlder = useCallback(() => {
    setShowOptions((curState) => !curState);
  }, []);

  const closeOptionsHandler = useCallback(
    (e) => {
      if (e.path.includes(select.current)) {
        return;
      }
      toggleOptionsHanlder();
    },
    [toggleOptionsHanlder]
  );

  const selectOptionHandler = (value) => {
    setSelectedOption(value);
    props.getValue(value);
    toggleOptionsHanlder();
  };

  useEffect(() => {
    if (props.value) {
      setSelectedOption(props.value);
    }
  }, [props.value]);

  useEffect(() => {
    if (showOptions) {
      document.body.addEventListener('click', closeOptionsHandler);
    }
    return () => {
      document.body.removeEventListener('click', closeOptionsHandler);
    };
  }, [showOptions, closeOptionsHandler]);

  const arrowIcon = showOptions ? arrowUp : arrowDown;
  const optionsList = props.options.map((item) => {
    return (
      <li key={item} onClick={selectOptionHandler.bind(null, item)}>
        {item}
      </li>
    );
  });

  return (
    <div className={styles.selectWrapper}>
      <label htmlFor={props.id}>{props.label}</label>
      <div id={props.id} className={styles.selectInput} ref={select}>
        <div onClick={toggleOptionsHanlder}>
          {selectedOption} <img src={arrowIcon} alt="arrow icon" />
        </div>
        {showOptions && <ul className={styles.options}>{optionsList}</ul>}
      </div>
    </div>
  );
};

export default Select;

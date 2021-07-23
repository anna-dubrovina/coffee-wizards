import styles from './Loader.module.scss';

const Loader = (props) => {
  return (
    <div className={props.small ? styles.smallLoader : styles.loader}>
      <h3>Loading... </h3>
      <div className={props.small ? styles.smallCoffeeLoader : styles.coffeeLoader}>
        <div className={styles.steam}>
          <div className={styles.smoke1}></div>
          <div className={styles.smoke2}></div>
          <div className={styles.smoke3}></div>
        </div>
        <div className={styles.cup}>
          <div className={styles.handle}></div>
        </div>
        <div className={styles.plate}></div>
        <div className={styles.bottom}></div>
      </div>
    </div>
  );
};

export default Loader;

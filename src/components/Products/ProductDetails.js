import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useScrollUp } from '../../hooks/useScrollUp';
import * as vars from '../../shared/globalVars';
import { fetchProduct } from '../../store/products-actions';
import { cartActions } from '../../store/cart-slice';
import { uiActions } from '../../store/ui-slice';
import Header from '../Layout/Header';
import Section from '../Layout/Section';
import Card from '../UI/Card';
import Button from '../UI/Button';
import styles from './ProductDetails.module.scss';

const tasteCircles = [<span />, <span />, <span />, <span />, <span />];

const setTasteBars = (barData) => {
  const bar = tasteCircles.map((el, i) => {
    if (i < barData) {
      return (el = <span key={i} className={styles.fullCircle} />);
    } else {
      return (el = <span key={i} />);
    }
  });
  return bar;
};

const ProductDetails = () => {
  useScrollUp();
  const { id } = useParams();
  const product = useSelector((state) => state.products.product);
  const dispatch = useDispatch();
  const [pricePerSize, setPricePerSize] = useState({});

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  let featuresTable = [];
  let tasteTable = [];
  let sizeControls = [];
  const prodPrice =
    product.subcategory === vars.BEANS
      ? pricePerSize.price || product.size.medium.price
      : product.price;
  const prodId =
    product.subcategory === vars.BEANS ? pricePerSize.id || id + 'medium' : id;
  const prodSize =
    product.subcategory === vars.BEANS
      ? pricePerSize.weight || product.size.medium.weight
      : product.size;

  const changeSizeHanlder = (weight, price, size) => {
    setPricePerSize((curState) => {
      const updatedState = { ...curState, weight, price, id: id + size };
      return updatedState;
    });
  };

  const openCartHanlder = () => {
    dispatch(
      cartActions.addItem({
        id: prodId,
        title: product.title,
        price: prodPrice,
        img: product.img,
        category: product.category + ' / ' + product.subcategory,
        size: prodSize,
      })
    );
    dispatch(uiActions.openCart());
  };

  for (const key in product) {
    let tableRow;
    let sizeControl;
    if (
      key === 'id' ||
      key === 'title' ||
      key === 'img' ||
      key === 'description' ||
      key === 'category' ||
      key === 'subcategory' ||
      key === 'price'
    ) {
      continue;
    }

    if (key === 'sweetness' || key === 'strength' || key === 'sourness') {
      tableRow = (
        <tr key={key}>
          <th>{key}</th>
          <td>{setTasteBars(product[key])}</td>
        </tr>
      );
      tasteTable.push(tableRow);
      continue;
    }

    if (typeof product[key] === 'object') {
      const sizeObj = product[key];
      tableRow = (
        <tr key={key}>
          <th>Size</th>
          <td> {pricePerSize.weight || sizeObj.medium.weight} </td>
        </tr>
      );

      for (const sizeProp in sizeObj) {
        sizeControl = (
          <li
            className={
              sizeObj[sizeProp].price === prodPrice ? styles.chosenSize : ''
            }
            key={sizeProp}
            onClick={changeSizeHanlder.bind(
              null,
              sizeObj[sizeProp].weight,
              sizeObj[sizeProp].price,
              sizeProp
            )}
          >
            {sizeObj[sizeProp].weight}
          </li>
        );
        sizeControls.unshift(sizeControl);
      }
      featuresTable.push(tableRow);
      continue;
    }

    tableRow = (
      <tr key={key}>
        <th> {key}</th>
        <td>{product[key]}</td>
      </tr>
    );
    featuresTable.push(tableRow);
  }

  return (
    <>
      <Header
        productPage={{
          category: product.category,
          subcategory: product.subcategory,
          title: product.title,
        }}
      />
      <Section>
        <h1>{product.title}</h1>

        <Card className={styles.productDetails}>
          <img src={product.img} alt={product.title} />

          <header className={styles.titleWrapper}>
            <h2>{product.title}</h2>
            <span>In Stock</span>
            <span>SKU#: {id}</span>
            {product.category === 'coffee' ? (
              <ul className={styles.sizeControl}>{sizeControls}</ul>
            ) : (
              <span className={styles.sizeControl}></span>
            )}
            <p className="lead">Price: ${prodPrice}</p>
            <Button btnStyle="btnMain" clicked={openCartHanlder}>
              Add to Cart
            </Button>
          </header>
          <div className={styles.description}>
            <h3>Description</h3>
            <table className={styles.table} cellSpacing="0">
              <tbody>
                <tr>
                  <td>{product.description}</td>
                </tr>
              </tbody>
            </table>

            {product.category === 'coffee' && (
              <>
                <h3>Taste</h3>
                <table className={styles.table} cellSpacing="0">
                  <tbody>{tasteTable}</tbody>
                </table>
              </>
            )}
            <h3>Features</h3>
            <table className={styles.table} cellSpacing="0">
              <tbody>{featuresTable}</tbody>
            </table>
          </div>
        </Card>
      </Section>
    </>
  );
};

export default ProductDetails;

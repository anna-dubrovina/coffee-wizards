import { productsActions } from './products-slice';
import { httpRequest } from '../shared/httpRequest';

const { getCategoryProds, getSubcategoryProds, getFeaturedProds, getProduct } =
    productsActions,
  CATEGORY = 'category',
  SUBCATEGORY = 'subcategory',
  FEATURED = 'featured';

const transfromData = (actionType, data) => {
  return (dispatch) => {
    let products = [];
    let featured = [];
    for (const key in data) {
      data[key].id = key;
      products.push(data[key]);
    }
    if (actionType === FEATURED) {
      for (let i = 0; i < 8; i++) {
        let index = Math.floor(Math.random() * products.length);
        featured.push(products[index]);
        products.splice(index, 1);
      }
    }
    actionType === SUBCATEGORY && dispatch(getSubcategoryProds(products));
    actionType === CATEGORY && dispatch(getCategoryProds(products));
    actionType === FEATURED && dispatch(getFeaturedProds(featured));
  };
};

export const fetchSubcategoryProds = (subcategory) => {
  return (dispatch) => {
    httpRequest(
      { url: `/products.json?orderBy="subcategory"&equalTo="${subcategory}"` },
      (resData) => dispatch(transfromData(SUBCATEGORY, resData))
    );
  };
};

export const fetchCategoryProds = (category) => {
  return (dispatch) => {
    httpRequest(
      { url: `/products.json?orderBy="category"&equalTo="${category}"` },
      (resData) => dispatch(transfromData(CATEGORY, resData))
    );
  };
};

export const fetchFeaturedProds = () => {
  return (dispatch) => {
    httpRequest({ url: '/products.json' }, (resData) =>
      dispatch(transfromData(FEATURED, resData))
    );
  };
};

export const fetchProduct = (id) => {
  return (dispatch) => {
    httpRequest({ url: `/products/${id}.json` }, (resData) =>
      dispatch(getProduct(resData))
    );
  };
};

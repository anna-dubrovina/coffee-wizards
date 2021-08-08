import { productsActions } from './products-slice';
import { httpRequest } from '../shared/httpRequest';

const { getCategoryProds, getSubcategoryProds, getFeaturedProds, getProduct } =
  productsActions;

const transfromData = (actionType, data) => {
  return (dispatch) => {
    let products = [];
    let featured = [];
    for (const key in data) {
      data[key].id = key;
      products.push(data[key]);
    }
    if (actionType === 'featured') {
      for (let i = 0; i < 8; i++) {
        let index = Math.floor(Math.random() * products.length);
        featured.push(products[index]);
        products.splice(index, 1);
      }
    }
    actionType === 'subcategory' && dispatch(getSubcategoryProds(products));
    actionType === 'category' && dispatch(getCategoryProds(products));
    actionType === 'featured' && dispatch(getFeaturedProds(featured));
  };
};

export const fetchSubcategoryProds = (subcategory) => {
  return (dispatch) => {
    httpRequest(
      { url: `/products.json?orderBy="subcategory"&equalTo="${subcategory}"` },
      (resData) => dispatch(transfromData('subcategory', resData))
    );
  };
};

export const fetchCategoryProds = (category) => {
  return (dispatch) => {
    httpRequest(
      { url: `/products.json?orderBy="category"&equalTo="${category}"` },
      (resData) => dispatch(transfromData('category', resData))
    );
  };
};

export const fetchFeaturedProds = () => {
  return (dispatch) => {
    httpRequest({ url: '/products.json' }, (resData) =>
      dispatch(transfromData('featured', resData))
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

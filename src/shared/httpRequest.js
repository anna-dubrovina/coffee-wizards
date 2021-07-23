import { store } from '../store';
import { uiActions } from '../store/ui-slice';
import { firebaseConfig } from '../firebase-data';

export const httpRequest = (requestConfig, successFunction) => {
  store.dispatch(uiActions.setIsLoading(true));

  fetch(firebaseConfig.databaseURL + requestConfig.url, {
    method: requestConfig.method ? requestConfig.method : 'GET',
    body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Request failed. Please try again later.');
      }
    })
    .then((resData) => {
      successFunction(resData);
      store.dispatch(uiActions.setIsLoading(false));
    })
    .catch((err) => {
      store.dispatch(uiActions.setIsLoading(false));
      store.dispatch(uiActions.setError(err.message));
    });
};

export const authHttpRequest = (requestConfig, successFunction) => {
  store.dispatch(uiActions.setIsLoading(true));
  
  fetch(requestConfig.url + firebaseConfig.apiKey, {
    method: requestConfig.method ? requestConfig.method : 'GET',
    body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((resData) => {
      if (resData.error) {
        throw new Error(resData.error.message);
      }
      store.dispatch(uiActions.setIsLoading(false));
      successFunction(resData);
    })
    .catch((err) => {
      const errorMsg = err.message.replaceAll('_', ' ').toLowerCase();
      store.dispatch(uiActions.setIsLoading(false));
      store.dispatch(uiActions.setError(errorMsg));
    });
};

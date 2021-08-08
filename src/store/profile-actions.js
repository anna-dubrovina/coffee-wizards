import { authHttpRequest, httpRequest } from '../shared/httpRequest';
import { profileActions } from './profile-slice';

let logoutTimer;

const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    logoutTimer = setTimeout(() => {
      dispatch(profileActions.logout());
    }, expirationTime * 1000);
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(profileActions.logout());
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };
};

const createNewUser = (email, userId) => {
  const newUser = {
    userId,
    contacts: {
      name: '',
      lastName: '',
      email,
      phone: '',
    },
    addresses: [],
  };
  httpRequest(
    {
      url: '/users.json',
      method: 'POST',
      body: newUser,
    },
    () => {}
  );
};

export const login = (url, email, password, isSignup) => {
  return (dispatch) => {
    authHttpRequest(
      {
        url,
        method: 'POST',
        body: {
          email,
          password,
          returnSecureToken: true,
        },
      },
      (resData) => {
        const expirationDate = new Date(
          new Date().getTime() + +resData.expiresIn * 1000
        );
        const userId = resData.localId.substring(0, 10);
        localStorage.setItem('token', resData.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', userId);
        isSignup && createNewUser(email, userId);
        dispatch(profileActions.login(userId));
        dispatch(checkAuthTimeout(resData.expiresIn));
      }
    );
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (!token || expirationDate <= new Date()) {
      dispatch(profileActions.logout());
    } else {
      dispatch(profileActions.login(userId));
      dispatch(
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  };
};

export const fetchUserData = (userId, dataType) => {
  return (dispatch) => {
    httpRequest(
      { url: `/users.json?orderBy="userId"&equalTo="${userId}"` },
      (resData) => {
        let contacts = {};
        let addresses = [];
        for (const key in resData) {
          contacts = resData[key].contacts;
          if (resData[key].addresses) {
            addresses = resData[key].addresses;
          }
        }
        if (dataType === 'contacts') {
          dispatch(profileActions.getUserContacts(contacts));
        } else if (dataType === 'addresses') {
          dispatch(profileActions.getUserAddresses(addresses));
        }
      }
    );
  };
};

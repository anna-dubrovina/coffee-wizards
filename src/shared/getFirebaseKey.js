import { firebaseConfig } from '../firebase-data';

export const getFirebaseKey = (id, update) => {
  fetch(
    `${firebaseConfig.databaseURL}/users.json?orderBy="userId"&equalTo="${id}"`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Request failed!');
      }
    })
    .then((resData) => {
      let keyName;
      for (const key in resData) {
        keyName = key;
      }
      update(keyName)
    })
    .catch((err) => {
      console.log(err);
    });
};

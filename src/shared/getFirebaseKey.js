import { httpRequest } from './httpRequest';

export const getFirebaseKey = (id, update) => {
  httpRequest(
    { url: `/users.json?orderBy="userId"&equalTo="${id}"` },
    (resData) => {
      let keyName;
      for (const key in resData) {
        keyName = key;
      }
      update(keyName);
    }
  );
};

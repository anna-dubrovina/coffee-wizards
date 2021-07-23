import deleteIcon from '../../assets/icons/trash.svg';
import editIcon from '../../assets/icons/edit.svg';
import { httpRequest } from '../../shared/httpRequest';
import { useDispatch } from 'react-redux';
import { fetchUserData } from '../../store/profile-actions';
import { getFirebaseKey } from '../../shared/getFirebaseKey';
import styles from './AddressesList.module.scss';

const AddressesList = (props) => {
  const dispatch = useDispatch();
  const updatedAddresses = [];
  props.addresses.forEach((item) => updatedAddresses.push({ ...item }));

  const deleteAddress = (id, key) => {
    const index = updatedAddresses.findIndex((item) => item.id === id);
    if ((index === 0) & (updatedAddresses.length > 1)) {
      updatedAddresses[1].isMain = true;
    }
    updatedAddresses.splice(index, 1);

    httpRequest(
      {
        url: `/users/${key}/addresses.json`,
        method: 'PUT',
        body: updatedAddresses,
      },
      () => {
        dispatch(fetchUserData(props.userId, 'addresses'));
      }
    );
  };

  const setMain = (id, key) => {
    updatedAddresses.forEach(
      (item) => (item.isMain = item.id === id ? true : false)
    );
    updatedAddresses.sort((firstEl, secondEl) => {
      const val = firstEl.isMain > secondEl.isMain ? -1 : 1;
      return val;
    });

    httpRequest(
      {
        url: `/users/${key}/addresses.json`,
        method: 'PUT',
        body: updatedAddresses,
      },
      () => {
        dispatch(fetchUserData(props.userId, 'addresses'));
      }
    );
  };

  const editAddressHandler = (addressData) =>
    props.changeMode('edit', addressData);
  const deleteAddressHandler = (addressId) =>
    getFirebaseKey(props.userId, deleteAddress.bind(null, addressId));
  const setMainHandler = (addressId) =>
    getFirebaseKey(props.userId, setMain.bind(null, addressId));

  let addressesList;

  if (props.addresses.length > 0) {
    addressesList = props.addresses.map((item) => {
      let mainAddress = <span className={styles.main}>Main</span>;
      if (!item.isMain) {
        mainAddress = (
          <span
            className={styles.setMain}
            onClick={setMainHandler.bind(null, item.id)}
          >
            Set as Main
          </span>
        );
      }

      return (
        <li className={styles.listItem} key={item.id}>
          <div>
            <h4>{item.deliveryMethod} Delivery</h4>
            <p>
              {item.city}, {item.address}, {item.postalCode}
            </p>
          </div>
          <div>
            {mainAddress}
            <img
              src={editIcon}
              alt="edit"
              onClick={editAddressHandler.bind(null, item)}
            />
            <img
              src={deleteIcon}
              alt="delete"
              onClick={deleteAddressHandler.bind(null, item.id)}
            />
          </div>
        </li>
      );
    });
  }

  return props.addresses.length === 0 ? (
    <h4>You don't have any saved addresses</h4>
  ) : (
    <ul>{addressesList} </ul>
  );
};
export default AddressesList;

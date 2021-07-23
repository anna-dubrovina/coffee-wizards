import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchUserData } from '../../store/profile-actions';
import AddressesForm from './AddressesForm';
import AddressesList from './AddressesList';
import Card from '../UI/Card';
import styles from './Addresses.module.scss';

const Addresses = () => {
  const { userId, userAddresses } = useSelector((state) => state.profile);
  const { isLoading } = useSelector((state) => state.ui);
  const [formMode, setFormMode] = useState('add');
  const [editData, setEditData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData(userId, 'addresses'));
  }, [dispatch, userId]);

  const changeFormMode = (mode, data) => {
    setFormMode(mode);
    setEditData(data || {});
  };

  return (
    <div className={styles.myAddresses}>
      <h1>My Addresses</h1>
      <Card className={styles.addressList}>
        <AddressesList
          userId={userId}
          addresses={userAddresses}
          changeMode={changeFormMode}
        />
      </Card>
      <Card className={styles.addressForm}>
        <h3> {formMode === 'add' ? 'Add New Address' : 'Edit Address'}</h3>
        <AddressesForm
          userId={userId}
          addresses={userAddresses}
          mode={formMode}
          editData={editData}
          changeMode={changeFormMode}
        />
      </Card>
    </div>
  );
};

export default Addresses;

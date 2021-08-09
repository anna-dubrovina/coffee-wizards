import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchUserData } from '../../store/profile-actions';
import AddressesForm from './AddressesForm';
import AddressesList from './AddressesList';
import Card from '../UI/Card';
import styles from './Addresses.module.scss';
import Loader from '../UI/Loader';
import * as vars from '../../shared/globalVars';

const LOADER_PLACE_1 = 'instead form';

const Addresses = () => {
  const { userId, userAddresses } = useSelector((state) => state.profile);
  const { isLoading } = useSelector((state) => state.ui);
  const [isAdding, setIsAdding] = useState(true);
  const [editData, setEditData] = useState({});
  const [loaderPlace, setLoaderPlace] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData(userId, vars.USER_ADDRESSES));
    setLoaderPlace(LOADER_PLACE_1);
  }, [dispatch, userId]);

  const changeFormMode = (data) => {
    setIsAdding((curState) => !curState);
    setEditData(data || {});
  };

  const changeLoaderPlace = (place) => setLoaderPlace(place);

  return (
    <div className={styles.addresses}>
      <h1>My Addresses</h1>
      <Card className={styles.addressList}>
        {isLoading & (loaderPlace === LOADER_PLACE_1) ? (
          <Loader />
        ) : (
          <AddressesList
            userId={userId}
            addresses={userAddresses}
            loaderPlace={loaderPlace}
            changeMode={changeFormMode}
            changeLoaderPlace={changeLoaderPlace}
          />
        )}
      </Card>
      <Card className={styles.addressForm}>
        <h3> {isAdding ? 'Add New Address' : 'Edit Address'}</h3>
        <AddressesForm
          userId={userId}
          addresses={userAddresses}
          addMode={isAdding}
          editData={editData}
          changeMode={changeFormMode}
          changeLoaderPlace={changeLoaderPlace}
        />
      </Card>
    </div>
  );
};

export default Addresses;

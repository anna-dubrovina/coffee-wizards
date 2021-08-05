import { useEffect, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { authCheckState } from './store/profile-actions';
import HomePage from './pages/HomePage';
import Layout from './components/Layout/Layout';
import Cart from './components/Cart/Cart';
import Modal from './components/UI/Modal';
import Loader from './components/UI/Loader';
import NotFoundPage from './pages/NotFoundPage';
import * as vars from './shared/globalVars';

const Checkout = lazy(() => import('./pages/CheckoutPage'));
const About = lazy(() => import('./pages/AboutPage'));
const Accessorize = lazy(() => import('./pages/AccessorizePage'));
const Profile = lazy(() => import('./pages/ProfilePage'));
const Coffee = lazy(() => import('./pages/CoffeePage'));
const Equipment = lazy(() => import('./pages/EquipmentPage'));
const Product = lazy(() => import('./components/Products/ProductDetails'));

const App = () => {
  const { isModalOpen, modalType, errorMessage } = useSelector(
    (state) => state.ui
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheckState());
  }, [dispatch]);

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <Modal>
            {modalType === 'cart' && <Cart />}
            {modalType === 'error' && (
              <div className="errorDiv">
                <h3>Error occured: {errorMessage}</h3>
              </div>
            )}
          </Modal>
        )}
      </AnimatePresence>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path={vars.CHECKOUT_MAIN} exact>
            <Checkout />
          </Route>
          <Route path="/">
            <Layout>
              <Suspense fallback={<Loader />}>
                <Switch>
                  <Route path={vars.PROFILE_MAIN}>
                    <Profile />
                  </Route>
                  <Route path={vars.PRODUCT_MAIN}>
                    <Product />
                  </Route>
                  <Route path={vars.ACCS_MAIN}>
                    <Accessorize />
                  </Route>
                  <Route path={vars.EQUIP_MAIN}>
                    <Equipment />
                  </Route>
                  <Route path={vars.COFFEE_MAIN}>
                    <Coffee />
                  </Route>
                  <Route path={vars.ABOUT_MAIN}>
                    <About />
                  </Route>
                  <Route path="/" exact>
                    <HomePage />
                  </Route>
                  <Route path="*">
                    <NotFoundPage />
                  </Route>
                </Switch>
              </Suspense>
            </Layout>
          </Route>
        </Switch>
      </Suspense>
    </>
  );
};

export default App;

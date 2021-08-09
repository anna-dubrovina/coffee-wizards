import { useEffect, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { authCheckState } from './store/profile-actions';
import * as vars from './shared/globalVars';
import HomePage from './pages/HomePage';
import Layout from './components/Layout/Layout';
import Cart from './components/Cart/Cart';
import CallbackForm from './components/UI/CallbackForm';
import Modal from './components/UI/Modal';
import Loader from './components/UI/Loader';
import NotFoundPage from './pages/NotFoundPage';
import { cartActions } from './store/cart-slice';

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
  const cart = JSON.parse(localStorage.getItem(vars.USER_CART));
  const dispatch = useDispatch();

  useEffect(() => dispatch(authCheckState()), [dispatch]);
  useEffect(() => dispatch(cartActions.setCart(cart)), [dispatch]);

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <Modal>
            {modalType === vars.CART && <Cart />}
            {modalType === vars.FORM && (
              <CallbackForm title="Leave Your Number" />
            )}
            {modalType === vars.ERROR && (
              <div className="error-msg">
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

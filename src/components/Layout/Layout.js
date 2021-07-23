import Footer from './Footer';
import Toolbar from './Toolbar';

const Layout = (props) => {
  return (
    <>
      <Toolbar />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;

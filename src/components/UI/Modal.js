import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { uiActions } from '../../store/ui-slice';
import * as vars from '../../shared/globalVars';
import Card from './Card';
import closeIcon from '../../assets/icons/close.svg';
import styles from './Modal.module.scss';

const Modal = (props) => {
  const dispatch = useDispatch();
  const { modalType } = useSelector((state) => state.ui);
  const classes =
    modalType === vars.ERROR
      ? [styles.modal, styles.errorModal]
      : [styles.modal];

  const closeModalHanlder = () => {
    modalType === vars.ERROR && dispatch(uiActions.setError(null));
    dispatch(uiActions.modalClose());
  };

  return ReactDOM.createPortal(
    <>
      <motion.div
        key="modal"
        initial={{ opacity: 0, transform: 'translateY(-150%)' }}
        animate={{ opacity: 1, transform: 'translateY(0)' }}
        exit={{
          transform: 'translateY(-150%)',
          opacity: 0.5,
        }}
        transition={{ duration: 0.3, type: 'spring' }}
        className={classes.join(' ')}
      >
        <Card cardStyle="cardDark">
          <img
            src={closeIcon}
            alt="close"
            className={styles.closeBtn}
            onClick={closeModalHanlder}
          />
          {props.children}
        </Card>
      </motion.div>

      <div className={styles.backdrop} onClick={closeModalHanlder}></div>
    </>,
    document.getElementById('modal')
  );
};

export default Modal;

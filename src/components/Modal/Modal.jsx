import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

const modalRoot = document.querySelector('#modal-root');

const Modal = () => {
  // componentDidMount() {
  //   window.addEventListener('keydown', this.escCloseModal);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.escCloseModal);
  return;
};

const escCloseModal = e => {
  if (e.code === 'Escape') {
    this.props.toggleModal();
  }
};

const closeOnBackDrop = event => {
  if (event.target === event.currentTarget) {
    this.props.toggleModal();
  }
};

return createPortal(
  <div className={css.overlay} onClick={closeOnBackDrop}>
    <div className={css.modal}>
      <img src={this.props.largeImageURL} alt="" />
    </div>
  </div>,
  modalRoot
);

export default Modal;

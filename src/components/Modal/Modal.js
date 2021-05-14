import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import './Modal.scss';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    const { onClose } = this.props;
    if (e.code === 'Escape') {
      onClose();
    }
  };

  handleBackdropClick = event => {
    const { onClose } = this.props;
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  render() {
    const { largeUrl } = this.props;
    return createPortal(
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">
          <img src={largeUrl} alt="" />
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;

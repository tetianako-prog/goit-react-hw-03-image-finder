import React from 'react';
import PropTypes from 'prop-types';
import './ImageGalleryItem.scss';

const ImageGalleryItem = ({ url, modalHandle, largeImageURL }) => {
  const handleModal = () => {
    modalHandle(largeImageURL);
  };
  return (
    <li className="ImageGalleryItem" onClick={handleModal}>
      <img src={url} alt="" className="ImageGalleryItem-image" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  modalHandle: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;

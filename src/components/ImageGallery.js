import React from 'react';
import './ImageGallery.scss';
import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = ({ photos }) => {
  return (
    <ul className="ImageGallery">
      {photos.map(item => (
        <ImageGalleryItem key={item.id} url={item.webformatURL} />
      ))}
    </ul>
  );
};

export default ImageGallery;

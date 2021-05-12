import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ onClickFunc }) => {
  return (
    <button className="Button" type="button" onClick={() => onClickFunc()}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onClickFunc: PropTypes.func.isRequired,
};

export default Button;

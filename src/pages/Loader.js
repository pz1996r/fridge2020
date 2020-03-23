import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function Loader({ secureRoute }) {
  useEffect(secureRoute);
  return <></>;
}

Loader.propTypes = {
  secureRoute: PropTypes.func.isRequired,
};
export default Loader;

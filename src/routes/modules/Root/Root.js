import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Root = props => {
  const {
    isPremium, loggedIn
  } = props;

  return <Redirect to={loggedIn ? (isPremium ? 'premium' : '/success') : '/onboarding'} />;
};

Root.propTypes = {
  isPremium: PropTypes.bool,
  loggedIn: PropTypes.bool,
};

export default Root;

import React from 'react';
import { validateCoupon, validateUser } from 'api/userValidation';
import { subscribeEmailUser, subscribeLoginUser } from 'api/subscribe';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as couponActions from 'ducks/coupon/actions';
import * as userActions from 'ducks/user/actions';
import * as generalActions from 'ducks/general/actions';
import { selectors as userSelectors } from 'ducks/user/selectors';
import { selectors as generalSelectors } from 'ducks/general/selectors';
import { selectors as couponSelectors } from 'ducks/coupon/selectors';
import * as snackbarActions from 'ducks/snackbar/actions';
import Checkout from './Checkout';

const mapStateToProps = state => ({
  stripeCoupon: userSelectors(state).stripeCoupon,
  loggedIn: userSelectors(state).loggedIn,
  subscriptionToken: userSelectors(state).subscriptionToken,
  linkEmail: userSelectors(state).linkEmail,
  tokenType: userSelectors(state).tokenType,
  client: userSelectors(state).client,
  expiry: userSelectors(state).expiry,
  uid: userSelectors(state).uid,
  percentOff: couponSelectors(state).percentOff,
  couponId: couponSelectors(state).id,
  language: userSelectors(state).language,
  isPremium: userSelectors(state).isPremium,
  userPaypalToken: generalSelectors(state).userPaypalToken,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCouponState: couponActions.setCouponState,
      showSnackbar: snackbarActions.showSnackbar,
      setUserPremium: userActions.setUserPremium,
      clearUserValidationCoupon: userActions.clearUserValidationCoupon,
      setUserFreshSignup: userActions.setUserFreshSignup,
      setUserPaypalToken: generalActions.setUserPaypalToken,
    },
    dispatch,
  );

const ConnectedComponent = props => {
  return (
    <Checkout
      {...props}
      validateCoupon={validateCoupon}
      subscribeLoginUser={subscribeLoginUser}
      subscribeEmailUser={subscribeEmailUser}
      validateUser={validateUser}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedComponent);

import React from 'react';
import {
  getQuestions,
  getStatements,
  getQuestionResponse,
  setTrainingDays,
  getEmotions,
} from 'api/onboarding';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as couponActions from 'ducks/coupon/actions';
import { selectors as userSelectors } from 'ducks/user/selectors';
import * as userActions from 'ducks/user/actions';
import * as snackbarActions from 'ducks/snackbar/actions';
import Onboarding from './Onboarding';

const mapStateToProps = state => ({
  loggedIn: userSelectors(state).loggedIn,
  tokenType: userSelectors(state).tokenType,
  client: userSelectors(state).client,
  expiry: userSelectors(state).expiry,
  uid: userSelectors(state).uid,
  language: userSelectors(state).language,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCouponState: couponActions.setCouponState,
      clearUserValidationCoupon: userActions.clearUserValidationCoupon,
      setUserState: userActions.setUserState,
      showSnackbar: snackbarActions.showSnackbar,
    },
    dispatch,
  );

const ConnectedComponent = props => {
  return (
    <Onboarding
      {...props}
      getQuestionsAPI={getQuestions}
      getEmotionsAPI={getEmotions}
      getStatementsAPI={getStatements}
      getQuestionResponseAPI={getQuestionResponse}
      setTrainingDaysAPI={setTrainingDays}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedComponent);

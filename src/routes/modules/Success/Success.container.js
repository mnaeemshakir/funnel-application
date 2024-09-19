import { connect } from 'react-redux';
import { selectors as userSelectors } from 'ducks/user/selectors';
import SuccessPage from './Success';

const mapStateToProps = state => ({
  loggedIn: userSelectors(state).loggedIn,
});

export default connect(mapStateToProps)(SuccessPage);

import { connect } from 'react-redux';
import { selectors as userSelectors } from 'ducks/user/selectors';
import Landing from './Landing';

const mapStateToProps = state => ({
  isPremium: userSelectors(state).isPremium,
});

export default connect(mapStateToProps)(Landing);

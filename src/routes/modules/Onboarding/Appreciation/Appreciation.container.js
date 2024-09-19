import { connect } from 'react-redux';
import { selectors as userSelectors } from 'ducks/user/selectors';
import Appreciation from './Appreciation';

const mapStateToProps = state => ({
  isPremium: userSelectors(state).isPremium,
});

export default connect(mapStateToProps)(Appreciation);

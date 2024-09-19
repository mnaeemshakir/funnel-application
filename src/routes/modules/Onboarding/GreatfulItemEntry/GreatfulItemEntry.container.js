import { connect } from 'react-redux';
import { selectors as userSelectors } from 'ducks/user/selectors';
import GreatfulItemEntry from './GreatfulItemEntry';

const mapStateToProps = state => ({
  isPremium: userSelectors(state).isPremium,
});

export default connect(mapStateToProps)(GreatfulItemEntry);

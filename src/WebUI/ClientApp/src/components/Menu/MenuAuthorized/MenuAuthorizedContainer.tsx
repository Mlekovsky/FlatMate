import { connect } from 'react-redux';
import { MenuAuthorized } from './MenuAuthorized';

const mapStateToProps = (state: any) => ({
  firstName: state.user.firstName,
  lastName: state.user.lastName,
  email: state.user.email,
  shortName: state.currentApartament.shortName,
  city: state.currentApartament.city,
  address: state.currentApartament.address,
  currentModules: state.currentApartament.currentModules,
});

const mapDispatchToProps = (dispatch: any) => ({});

const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(MenuAuthorized);
export default IndexContainer;

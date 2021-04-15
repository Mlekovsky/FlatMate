import { connect } from 'react-redux';
import { MenuAuthorized } from './MenuAuthorized';
import { bindActionCreators } from 'redux';
import { actionCreatos } from 'src/actions/user/UserAction';

const mapStateToProps = (state: any) => ({
  firstName: state.user.firstName,
  lastName: state.user.lastName,
  email: state.user.email,
  shortName: state.currentApartament.shortName,
  city: state.currentApartament.city,
  address: state.currentApartament.address,
  currentModules: state.currentApartament.currentModules,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      logout: actionCreatos.logout,
    },
    dispatch,
  );

const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(MenuAuthorized);
export default IndexContainer;

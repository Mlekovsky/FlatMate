import { connect } from 'react-redux';
import { MenuAuthorized } from './MenuAuthorized';
import { bindActionCreators } from 'redux';
import { actionCreatos } from '../../../actions/user/UserAction';

const mapStateToProps = (state: any) => ({
  shortName: state.currentApartament.shortName,
  currentModules: state.currentApartament.currentModules,
  apartamentId: state.currentApartament.id
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      logout: actionCreatos.logout,
      userInfo: actionCreatos.refreshInfo
    },
    dispatch,
  );

const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(MenuAuthorized);
export default IndexContainer;

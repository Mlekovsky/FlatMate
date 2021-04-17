import { connect } from 'react-redux';
import { Dashboard } from './Dashboard';
import { bindActionCreators } from 'redux';
import { actionCreatos } from '../../actions/user/UserAction';

const mapStateToProps = (state: any) => ({
  firstName: state.user.firstName,
  lastName: state.user.lastName,
  email: state.user.email,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getUserInfo: actionCreatos.refreshInfo
    },
    dispatch,
  );

const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);
export default IndexContainer;

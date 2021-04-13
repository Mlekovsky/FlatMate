import { connect } from 'react-redux';
import { actionCreatos } from 'src/actions/user/UserAction';
import { Menu } from './Menu';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      authorize: actionCreatos.authorizeToken,
    },
    dispatch,
  );

const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(Menu);
export default IndexContainer;

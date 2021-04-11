import { connect } from 'react-redux';
import { Menu } from './Menu';

const mapStateToProps = (state: any) => ({
  firstName: state.user.firstName,
  lastName: state.user.lastName,
  email: state.user.email,
});

const mapDispatchToProps = (dispatch: any) => ({});

const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(Menu);
export default IndexContainer;

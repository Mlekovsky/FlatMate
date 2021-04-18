import { connect } from 'react-redux';
import { DeleteApartament } from './DeleteApartament';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../actions/apartament/apartamentAction';

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      deleteApartament: actionCreators.deleteApartament,
      removeUserFromApartament: actionCreators.removeUserFromApartament
    },
    dispatch,
  );

const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(DeleteApartament);
export default IndexContainer;

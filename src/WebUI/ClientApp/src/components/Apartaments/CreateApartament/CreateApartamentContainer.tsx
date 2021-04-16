import { connect } from 'react-redux';
import { CreateApartament } from './CreateApartament';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../actions/apartament/apartamentAction';

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      createApartament: actionCreators.createApartament,
    },
    dispatch,
  );

const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(CreateApartament);
export default IndexContainer;

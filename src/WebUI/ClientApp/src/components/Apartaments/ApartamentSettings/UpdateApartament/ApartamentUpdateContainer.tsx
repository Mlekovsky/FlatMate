import { connect } from 'react-redux';
import { ApartamentUpdate } from './ApartamentUpdate';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../actions/apartament/apartamentAction';

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
        updateApartament: actionCreators.updateApartament,
    },
    dispatch,
  );

const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(ApartamentUpdate);
export default IndexContainer;

import { connect } from 'react-redux';
import { ApartamentList } from './ApartamentList';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../actions/apartament/apartamentAction';

const mapStateToProps = (state: any) => ({
  apartamentList: state.dashboard.apartamentList,
  availableApartamentList: state.dashboard.availableApartamentList,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getApartamentList: actionCreators.getApartamentList,
      getAvailableApartaments: actionCreators.getAvailableApartamentsList, //Do podmiany
    },
    dispatch,
  );

const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(ApartamentList);
export default IndexContainer;
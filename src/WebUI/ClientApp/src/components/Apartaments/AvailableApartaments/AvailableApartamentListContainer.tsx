import { connect } from 'react-redux';
import { AvailableApartamentList} from './AvailableApartamentList';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../actions/apartament/apartamentAction';

const mapStateToProps = (state: any) => ({
  availableApartamentList: state.dashboard.availableApartamentList,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getAvailableApartaments: actionCreators.getAvailableApartamentsList,
      chooseApartament: actionCreators.getApartamentInfo
    },
    dispatch,
  );

const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(AvailableApartamentList);
export default IndexContainer;

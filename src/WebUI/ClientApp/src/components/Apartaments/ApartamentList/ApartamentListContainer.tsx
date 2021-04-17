import { connect } from 'react-redux';
import { ApartamentList } from './ApartamentList';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../actions/apartament/apartamentAction';

const mapStateToProps = (state: any) => ({
  apartamentList: state.dashboard.apartamentList,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getApartamentList: actionCreators.getApartamentList,
      joinApartament: actionCreators.joinApartament
    },
    dispatch,
  );

const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(ApartamentList);
export default IndexContainer;

import { connect } from 'react-redux';
import { ApartamentSettings } from './ApartamentSettings';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state: any) => ({
  shortName: state.currentApartament.shortName,
  currentModules: state.currentApartament.currentModules,
  apartamentId: state.currentApartament.id,
  city: state.currentApartament.city,
  address: state.currentApartament.address,
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({}, dispatch);

const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(ApartamentSettings);
export default IndexContainer;

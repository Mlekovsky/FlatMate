import { connect } from 'react-redux';
import { UpdateApartamentModules } from './UpdateApartamentModules';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../actions/apartament/apartamentAction';
import { actionCreators as moduleActionCreators} from '../../../../actions/module/moduleAction';

const mapStateToProps = (state: any) => ({
    modulesList: state.modules.modulesList
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
        updateApartamentModules: actionCreators.updateApartamentModules,
        getModulesInfo: moduleActionCreators.getModulesInfo
    },
    dispatch,
  );

const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(UpdateApartamentModules);
export default IndexContainer;

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onChange } from '../../actions/menu/menuAction';
import MainListItems from './MainListItems';

const mapStateToProps = (state: any) => ({
  selectedValue: state.mainList.selectedValue,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      onChange: onChange,
    },
    dispatch,
  );

const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(MainListItems);
export default IndexContainer;

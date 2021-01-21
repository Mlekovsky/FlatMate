import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onChange } from '../../actions/menu/menuAction';
import SecondaryListItems from './SecondaryListItems';

const mapStateToProps = (state: any) => ({
  selectedValue: state.secondaryList.selectedValue,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      onChange: onChange,
    },
    dispatch,
  );

const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(SecondaryListItems);
export default IndexContainer;

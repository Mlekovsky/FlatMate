import React, { FC, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';
import './assets/Loader.scss';

interface ILoader {
  /** Informacja czy loader jest aktualnie wyświetlony */
  isVisible: boolean;

  /** Tekst wyświetlany pod loaderem */
  text?: string;
}

/** Loader */
//@ts-ignore
const Loader: FC<ILoader> = ({ isVisible, text }) =>
  isVisible && (
    <div className="loader-block">
      <div className="loader-wrapper">
        <div>
          <div className="loader" />
          {!isEmpty(text) && <div className="text">{text}</div>}
        </div>
      </div>
    </div>
  );

Loader.defaultProps = {
  isVisible: false,
  text: undefined,
};

const mapStateToProps = (state: any) => ({
  isVisible: state.loader.isVisible,
  text: state.loader.text,
});
const mapDispatchToProps = (dispatch: any) => bindActionCreators({}, dispatch);

//@ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(memo(Loader));

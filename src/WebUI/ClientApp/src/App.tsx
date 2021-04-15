import React, { FC, memo } from 'react';
import { withRouter } from 'react-router';
import { Layout } from './components/Layout';
import './custom.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Routes from './components/Routes';
import { actionCreatos } from './actions/user/UserAction';

interface IApp {
  authorize: (token: string) => void;
}

const App: FC<IApp> = ({ authorize }) => {
  const getToken = () => {
    let token = localStorage.getItem('token');

    if (token) {
      authorize(token);
      //Jeśli autoryzacja tokena się nie powiedzie, to zostaje on usunięty z sesji
      token = localStorage.getItem('token');
    }

    return token ? token : '';
  };
  return (
    <Layout token={getToken()}>
      <Routes />
    </Layout>
  );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      authorize: actionCreatos.authorizeToken,
    },
    dispatch,
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(memo(App)));

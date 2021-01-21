import React, { Component, FC, memo } from 'react';
import { withRouter } from 'react-router';
import { Layout } from './components/Layout';
import './custom.css';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Routes from './components/Routes';

interface IApp {}

const App: FC<IApp> = () => {
  const renderRoutes = () => {
    const history = createBrowserHistory();
    //@ts-ignore
    return <Routes history={history} />;
  };

  return <Layout>{renderRoutes()}</Layout>;
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(memo(App)));

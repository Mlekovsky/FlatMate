import React, { FC, memo } from 'react';
import { withRouter } from 'react-router';
import { Layout } from './components/Layout';
import './custom.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Routes from './components/Routes';

interface IApp {}

const App: FC<IApp> = () => (
  <Layout>
    <Routes />
  </Layout>
);

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(memo(App)));

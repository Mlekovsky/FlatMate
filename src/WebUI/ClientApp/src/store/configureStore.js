import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import * as Todo from '../reducer/Todo/TodoReducer';
import * as Loader from '../reducer/common/loaderReducer';
import * as User from '../reducer/user/userReducer';
import * as Apartament from '../reducer/apartament/apartamentReducer';
import * as Dashboard from '../reducer/dashboard/dashboardReducer';

export default function configureStore(history, initialState) {
  const reducers = {
    toDos: Todo.reducer,
    loader: Loader.reducer,
    user: User.reducer,
    currentApartament: Apartament.reducer,
    dashboard: Dashboard.reducer,
  };

  const middleware = [thunk, routerMiddleware(history)];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];

  // const isDevelopment = process.env.NODE_ENV === 'development';
  // if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
  //   enhancers.push(window.devToolsExtension());
  // }

  const rootReducer = combineReducers({
    router: connectRouter(history),
    ...reducers,
  });

  return createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), ...enhancers));
}

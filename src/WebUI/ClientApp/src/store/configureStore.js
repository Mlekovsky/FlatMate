import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import * as Todo from '../reducer/Todo/TodoReducer';
import * as Loader from '../reducer/common/loaderReducer';
import * as MainList from '../reducer/menu/MainListItemReducer';
import * as SecondaryList from '../reducer/menu/SecondaryListItemReducer';

export default function configureStore(history, initialState) {
  const reducers = {
    toDos: Todo.reducer,
    loader: Loader.reducer,
    mainList: MainList.reducer,
    secondaryList: SecondaryList.reducer,
  };

  const middleware = [thunk, routerMiddleware(history)];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];

  // const isDevelopment = process.env.NODE_ENV === 'development';
  // if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
  //   enhancers.push(window.devToolsExtension());
  // }

  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer,
  });

  return createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), ...enhancers));
}

import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import * as Todo from '../reducer/Todo/TodoReducer';
import * as Loader from '../reducer/common/loaderReducer';
import * as User from '../reducer/user/userReducer';
import * as Apartament from '../reducer/apartament/apartamentReducer';
import * as Dashboard from '../reducer/dashboard/dashboardReducer';
import * as Module from '../reducer/module/modulesReducer';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 

export default function configureStore(history, initialState) {
  const reducers = {
    toDos: Todo.reducer,
    loader: Loader.reducer,
    user: User.reducer,
    currentApartament: Apartament.reducer,
    dashboard: Dashboard.reducer,
    modules: Module.reducer
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

  const persistConfig = {
    key: 'root',
    storage
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  let store = createStore(persistedReducer, initialState, compose(applyMiddleware(...middleware), ...enhancers));
  let persistor = persistStore(store);
  return {store, persistor}
}

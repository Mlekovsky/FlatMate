import { ModuleAPI } from '../../api/ModulesAPI';
import { GET_MODULES } from '../module/moduleActionType';

export const actionCreators = {
  getModulesInfo: () => async (dispatch, getState) => {
    try {
      const token = localStorage.getItem('token');
      const modules = await ModuleAPI.getModules(token);
      if (modules.data.succeeded) {
        dispatch({
          type: GET_MODULES,
          payload: {
            modulesList: modules.data.response.modulesInfo,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  },
};

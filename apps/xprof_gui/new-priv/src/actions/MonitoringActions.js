import { getMfas } from '../selectors';
import * as types from '../constants/ActionTypes';
import * as XProf from '../api';
import { updateListMonitoringFunctions, setCallsControl, getCallees } from './';
import { parseToMfa } from '../utils';

const stopMonitoringFunctionRequest = mfas => ({
  type: types.STOP_MONITORING_FUNCTION,
  mfas,
});

const stopMonitoringFunctionError = mfas => ({
  type: types.STOP_MONITORING_FUNCTION_ERROR,
  mfas,
});

export const stopMonitoringFunction = mfa => async (dispatch, getState) => {
  const state = getState();
  const mfas = getMfas(state);
  const mfasReduced = mfas.filter(m => m[3] !== mfa[3]);

  dispatch(stopMonitoringFunctionRequest(mfasReduced));

  const { error } = await XProf.stopMonitoringFunction(mfa[0], mfa[1], mfa[2]);
  if (error) {
    console.log('ERROR: ', error);
    dispatch(stopMonitoringFunctionError(mfas));
  }
};

export const startMonitoringFunction = functionName => async (
  dispatch,
  getState,
) => {
  const state = getState();
  const mfas = getMfas(state);
  const isMonitored = mfas.filter(mfa => mfa[3] === functionName).length;

  if (!isMonitored) {
    const mfa = parseToMfa(functionName);
    const control = {
      threshold: undefined,
      limit: undefined,
      collecting: false,
    };

    dispatch(setCallsControl({ [functionName]: control }));
    dispatch(updateListMonitoringFunctions([mfa, ...mfas]));
    dispatch(getCallees(mfa));

    const { error } = await XProf.startMonitoringFunction(functionName);
    if (error) {
      console.log('ERROR: ', error);
      dispatch(updateListMonitoringFunctions(mfas));
    }
  }
};

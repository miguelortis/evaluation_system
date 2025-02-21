import {
  ASSIGNED_EVALUATIONs_BY_EMPLOYEE_LIST_ERROR,
  ASSIGNED_EVALUATIONs_BY_EMPLOYEE_LIST_REQUEST,
  ASSIGNED_EVALUATIONs_BY_EMPLOYEE_LIST_RESET,
  ASSIGNED_EVALUATIONs_BY_EMPLOYEE_LIST_SUCCESS,
  EVALUATION_BY_ID_ERROR,
  EVALUATION_BY_ID_REQUEST,
  EVALUATION_BY_ID_RESET,
  EVALUATION_BY_ID_SUCCESS,
  EVALUATION_LIST_ERROR,
  EVALUATION_LIST_REQUEST,
  EVALUATION_LIST_RESET,
  EVALUATION_LIST_SUCCESS,
  NEW_EVALUATION_ERROR,
  NEW_EVALUATION_REQUEST,
  NEW_EVALUATION_RESET,
  NEW_EVALUATION_SUCCESS,
  UPDATE_EVALUATION_ERROR,
  UPDATE_EVALUATION_REQUEST,
  UPDATE_EVALUATION_RESET,
  UPDATE_EVALUATION_SUCCESS,
} from "../constants/evaluationConstants";

export const evaluationRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_EVALUATION_REQUEST:
      return {
        evaluationData: null,
        evaluationLoading: true,
        evaluationError: null,
      };
    case NEW_EVALUATION_SUCCESS:
      return {
        evaluationData: action.payload,
        evaluationSuccess: true,
        evaluationLoading: false,
        evaluationError: null,
      };
    case NEW_EVALUATION_ERROR:
      return {
        evaluationError: action.payload,
        evaluationLoading: false,
      };
    case NEW_EVALUATION_RESET:
      return {};
    default:
      return state;
  }
};

export const evaluationListReducer = (state = {}, action) => {
  switch (action.type) {
    case EVALUATION_LIST_REQUEST:
      return {
        evaluationListData: null,
        evaluationListLoading: true,
        evaluationListError: null,
      };
    case EVALUATION_LIST_SUCCESS:
      return {
        evaluationListData: action.payload,
        evaluationListSuccess: true,
        evaluationListLoading: false,
        evaluationListError: null,
      };
    case EVALUATION_LIST_ERROR:
      return {
        evaluationListError: action.payload,
        evaluationListLoading: false,
      };
    case EVALUATION_LIST_RESET:
      return {};
    default:
      return state;
  }
};

export const updateEvaluationReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EVALUATION_REQUEST:
      return {
        updateEvaluationData: null,
        updateEvaluationLoading: true,
        updateEvaluationError: null,
      };
    case UPDATE_EVALUATION_SUCCESS:
      return {
        updateEvaluationData: action.payload,
        updateEvaluationSuccess: true,
        updateEvaluationLoading: false,
        updateEvaluationError: null,
      };
    case UPDATE_EVALUATION_ERROR:
      return {
        updateEvaluationError: action.payload,
        updateEvaluationLoading: false,
      };
    case UPDATE_EVALUATION_RESET:
      return {};
    default:
      return state;
  }
};

export const assignedEvaluationsByEmployeeListReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case ASSIGNED_EVALUATIONs_BY_EMPLOYEE_LIST_REQUEST:
      return {
        assignedEvaluationsByEmployeeListData: null,
        assignedEvaluationsByEmployeeListLoading: true,
        assignedEvaluationsByEmployeeListError: null,
      };
    case ASSIGNED_EVALUATIONs_BY_EMPLOYEE_LIST_SUCCESS:
      return {
        assignedEvaluationsByEmployeeListData: action.payload,
        assignedEvaluationsByEmployeeListSuccess: true,
        assignedEvaluationsByEmployeeListLoading: false,
        assignedEvaluationsByEmployeeListError: null,
      };
    case ASSIGNED_EVALUATIONs_BY_EMPLOYEE_LIST_ERROR:
      return {
        assignedEvaluationsByEmployeeListError: action.payload,
        assignedEvaluationsByEmployeeListLoading: false,
      };
    case ASSIGNED_EVALUATIONs_BY_EMPLOYEE_LIST_RESET:
      return {};
    default:
      return state;
  }
};

export const evaluationByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case EVALUATION_BY_ID_REQUEST:
      return {
        evaluationByIdData: null,
        evaluationByIdLoading: true,
        evaluationByIdListError: null,
      };
    case EVALUATION_BY_ID_SUCCESS:
      return {
        evaluationByIdListData: action.payload,
        evaluationByIdListSuccess: true,
        evaluationByIdListLoading: false,
        evaluationByIdListError: null,
      };
    case EVALUATION_BY_ID_ERROR:
      return {
        evaluationByIdListError: action.payload,
        evaluationByIdListLoading: false,
      };
    case EVALUATION_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

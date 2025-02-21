import {
  NEW_EVALUATION_RES_ERROR,
  NEW_EVALUATION_RES_REQUEST,
  NEW_EVALUATION_RES_RESET,
  NEW_EVALUATION_RES_SUCCESS,
} from "../constants/evaluationResponseConstants";

export const evaluationResponseReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_EVALUATION_RES_REQUEST:
      return {
        evaluationResponseData: null,
        evaluationResponseLoading: true,
        evaluationResponseError: null,
      };
    case NEW_EVALUATION_RES_SUCCESS:
      return {
        evaluationResponseData: action.payload,
        evaluationResponseSuccess: true,
        evaluationResponseLoading: false,
        evaluationResponseError: null,
      };
    case NEW_EVALUATION_RES_ERROR:
      return {
        evaluationResponseError: action.payload,
        evaluationResponseLoading: false,
      };
    case NEW_EVALUATION_RES_RESET:
      return {};
    default:
      return state;
  }
};

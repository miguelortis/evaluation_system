import axios from "../../../axiosConfig";
import {
  EVALUATION_RESPONSE_ERROR,
  EVALUATION_RESPONSE_REQUEST,
  EVALUATION_RESPONSE_SUCCESS,
  NEW_EVALUATION_RES_ERROR,
  NEW_EVALUATION_RES_REQUEST,
  NEW_EVALUATION_RES_SUCCESS,
} from "../constants/evaluationResponseConstants";

export const evaluationResponseRegister =
  (responseData, userId) => async (dispatch, getState) => {
    try {
      dispatch({ type: NEW_EVALUATION_RES_REQUEST });

      const { authData } = getState().currentUser;
      const res = await axios.post(
        "/evaluations-res/register",
        { ...responseData, userId: userId || authData._id },
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );

      dispatch({ type: NEW_EVALUATION_RES_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({
        type: NEW_EVALUATION_RES_ERROR,
        payload: err?.response?.data?.message,
      });
    }
  };

export const getEvaluationResponse =
  (evaluationId, userId) => async (dispatch, getState) => {
    try {
      dispatch({ type: EVALUATION_RESPONSE_REQUEST });

      const { authData } = getState().currentUser;
      const res = await axios.get(
        `/evaluations-res/evaluation?evaluationId=${evaluationId}&userId=${
          userId || authData?._id
        }`,
        {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        }
      );

      dispatch({ type: EVALUATION_RESPONSE_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({
        type: EVALUATION_RESPONSE_ERROR,
        payload: err?.response?.data?.message,
      });
    }
  };

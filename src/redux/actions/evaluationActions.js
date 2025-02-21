import axios from "../../../axiosConfig";
import {
  ASSIGNED_EVALUATIONs_BY_EMPLOYEE_LIST_ERROR,
  ASSIGNED_EVALUATIONs_BY_EMPLOYEE_LIST_REQUEST,
  ASSIGNED_EVALUATIONs_BY_EMPLOYEE_LIST_SUCCESS,
  EVALUATION_BY_ID_ERROR,
  EVALUATION_BY_ID_REQUEST,
  EVALUATION_BY_ID_SUCCESS,
  EVALUATION_LIST_ERROR,
  EVALUATION_LIST_REQUEST,
  EVALUATION_LIST_SUCCESS,
  NEW_EVALUATION_ERROR,
  NEW_EVALUATION_REQUEST,
  NEW_EVALUATION_SUCCESS,
  UPDATE_EVALUATION_ERROR,
  UPDATE_EVALUATION_REQUEST,
  UPDATE_EVALUATION_SUCCESS,
} from "../constants/evaluationConstants";

export const evaluationRegister =
  (evaluationData) => async (dispatch, getState) => {
    try {
      dispatch({ type: NEW_EVALUATION_REQUEST });

      const { authData } = getState().currentUser;
      const res = await axios.post("/evaluations/register", evaluationData, {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      });

      dispatch({ type: NEW_EVALUATION_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({
        type: NEW_EVALUATION_ERROR,
        payload: err?.response?.data.message,
      });
    }
  };

export const getEvaluationList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: EVALUATION_LIST_REQUEST });

    const { authData } = getState().currentUser;
    const res = await axios.get("/evaluations", {
      headers: {
        Authorization: `Bearer ${authData.token}`,
      },
    });

    dispatch({ type: EVALUATION_LIST_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: EVALUATION_LIST_ERROR,
      payload: err?.response?.data.message,
    });
  }
};

export const updateEvaluation = (id, body) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_EVALUATION_REQUEST });

    const { authData } = getState().currentUser;
    const res = await axios.put(`/evaluations/${id}`, body, {
      headers: {
        Authorization: `Bearer ${authData.token}`,
      },
    });

    dispatch({ type: UPDATE_EVALUATION_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: UPDATE_EVALUATION_ERROR,
      payload: err?.response?.data.message,
    });
  }
};

export const getAssignedEvaluationsByEmployeeId =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: ASSIGNED_EVALUATIONs_BY_EMPLOYEE_LIST_REQUEST });

      const { authData } = getState().currentUser;
      const res = await axios.get(
        `/evaluations/assigned/${id || authData?._id}`,
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );

      dispatch({
        type: ASSIGNED_EVALUATIONs_BY_EMPLOYEE_LIST_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ASSIGNED_EVALUATIONs_BY_EMPLOYEE_LIST_ERROR,
        payload: err?.response?.data.message,
      });
    }
  };

export const getEvaluationById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: EVALUATION_BY_ID_REQUEST });

    const { authData } = getState().currentUser;
    const res = await axios.get(`/evaluations/${id}`, {
      headers: {
        Authorization: `Bearer ${authData.token}`,
      },
    });

    dispatch({
      type: EVALUATION_BY_ID_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EVALUATION_BY_ID_ERROR,
      payload: err?.response?.data.message,
    });
  }
};

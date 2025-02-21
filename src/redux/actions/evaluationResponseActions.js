import axios from "../../../axiosConfig";
import {
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

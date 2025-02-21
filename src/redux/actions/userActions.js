import axios from "../../../axiosConfig";
import {
  EMPLOYEE_USER_LIST_ERROR,
  EMPLOYEE_USER_LIST_REQUEST,
  EMPLOYEE_USER_LIST_SUCCESS,
} from "../constants/userConstants";

export const getListOfEmployeeUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: EMPLOYEE_USER_LIST_REQUEST });

    const { authData } = getState().currentUser;
    const res = await axios.get("/employees", {
      headers: {
        Authorization: `Bearer ${authData.token}`,
      },
    });

    dispatch({ type: EMPLOYEE_USER_LIST_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: EMPLOYEE_USER_LIST_ERROR,
      payload: err?.response?.data.message,
    });
  }
};

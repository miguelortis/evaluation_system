import { jwtDecode } from "jwt-decode";
import axios from "../../../axiosConfig";
import {
  CURRENT_USER_ERROR,
  CURRENT_USER_REQUEST,
  CURRENT_USER_SUCCESS,
  REGISTER_USER_ERROR,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from "../constants/authConstants";

export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: CURRENT_USER_REQUEST });
    const res = await axios.post("/auth/login", userData);
    const { token } = res.data;
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    decoded.token = token;
    dispatch({
      type: CURRENT_USER_SUCCESS,
      payload: decoded,
    });
  } catch (err) {
    dispatch({ type: CURRENT_USER_ERROR, payload: err?.response?.data });
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const res = await axios.post("/auth/register", userData);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: REGISTER_USER_ERROR, payload: err?.response?.data });
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "/sign-in";
};

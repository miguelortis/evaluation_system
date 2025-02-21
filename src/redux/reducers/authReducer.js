import {
  CURRENT_USER_REQUEST,
  CURRENT_USER_SUCCESS,
  CURRENT_USER_ERROR,
  CURRENT_USER_RESET,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  REGISTER_USER_RESET,
} from "../constants/authConstants";

const signInReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENT_USER_REQUEST:
      return {
        authData: null,
        authLoading: true,
        authError: null,
      };
    case CURRENT_USER_SUCCESS:
      return {
        authData: action.payload,
        authSuccess: true,
        authLoading: false,
        authError: null,
      };
    case CURRENT_USER_ERROR:
      return {
        authError: action.payload,
        authLoading: false,
      };
    case CURRENT_USER_RESET:
      return {};
    default:
      return state;
  }
};

const registerUserReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        registerUserData: null,
        registerUserLoading: true,
        registerUserError: null,
      };
    case REGISTER_USER_SUCCESS:
      return {
        registerUserData: action.payload,
        registerUserSuccess: true,
        registerUserLoading: false,
        registerUserError: null,
      };
    case REGISTER_USER_ERROR:
      return {
        registerUserError: action.payload,
        registerUserLoading: false,
      };
    case REGISTER_USER_RESET:
      return {};
    default:
      return state;
  }
};

export { signInReducer, registerUserReducer };

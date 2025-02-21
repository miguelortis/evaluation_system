import {
  EMPLOYEE_USER_LIST_ERROR,
  EMPLOYEE_USER_LIST_REQUEST,
  EMPLOYEE_USER_LIST_RESET,
  EMPLOYEE_USER_LIST_SUCCESS,
} from "../constants/userConstants";

export const employeeUserListReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_USER_LIST_REQUEST:
      return {
        employeeUserListData: null,
        employeeUserListLoading: true,
        employeeUserListError: null,
      };
    case EMPLOYEE_USER_LIST_SUCCESS:
      return {
        employeeUserListData: action.payload,
        employeeUserListSuccess: true,
        employeeUserListLoading: false,
        employeeUserListError: null,
      };
    case EMPLOYEE_USER_LIST_ERROR:
      return {
        employeeUserListError: action.payload,
        employeeUserListLoading: false,
      };
    case EMPLOYEE_USER_LIST_RESET:
      return {};
    default:
      return state;
  }
};

import { configureStore } from "@reduxjs/toolkit";
import { registerUserReducer, signInReducer } from "./reducers/authReducer";
import {
  assignedEvaluationsByEmployeeListReducer,
  evaluationListReducer,
  evaluationRegisterReducer,
  updateEvaluationReducer,
} from "./reducers/evaluationReducer";
import { employeeUserListReducer } from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    currentUser: signInReducer,
    registerUser: registerUserReducer,
    evaluationRegister: evaluationRegisterReducer,
    evaluationList: evaluationListReducer,
    employeeUserList: employeeUserListReducer,
    updateEvaluation: updateEvaluationReducer,
    assignedEvaluationsByEmployeeList: assignedEvaluationsByEmployeeListReducer,
  },
});

export default store;

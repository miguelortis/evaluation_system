import { configureStore } from "@reduxjs/toolkit";
import { registerUserReducer, signInReducer } from "./reducers/authReducer";
import {
  assignedEvaluationsByEmployeeListReducer,
  evaluationByIdReducer,
  evaluationListReducer,
  evaluationRegisterReducer,
  updateEvaluationReducer,
} from "./reducers/evaluationReducer";
import { employeeUserListReducer } from "./reducers/userReducer";
import { evaluationResponseReducer } from "./reducers/evaluationResponseReducer";

const store = configureStore({
  reducer: {
    currentUser: signInReducer,
    registerUser: registerUserReducer,
    evaluationRegister: evaluationRegisterReducer,
    evaluationList: evaluationListReducer,
    employeeUserList: employeeUserListReducer,
    updateEvaluation: updateEvaluationReducer,
    assignedEvaluationsByEmployeeList: assignedEvaluationsByEmployeeListReducer,
    evaluationById: evaluationByIdReducer,
    evaluationResponse: evaluationResponseReducer,
  },
});

export default store;

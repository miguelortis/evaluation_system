import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Divider, List, Row } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import useAlert from "../../hooks/useAlert";
import CustomModal from "../Modal/CustomModal";
import CustomSelect from "../Select/CustomSelect";
import { getListOfEmployeeUsers } from "../../redux/actions/userActions";
import { EMPLOYEE_USER_LIST_RESET } from "../../redux/constants/userConstants";
import { updateEvaluation } from "../../redux/actions/evaluationActions";
import { UPDATE_EVALUATION_RESET } from "../../redux/constants/evaluationConstants";

const AssignUsersToEvaluationModal = ({ open, onClose, evaluation }) => {
  const dispatch = useDispatch();
  const { alert } = useAlert();

  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState(null);
  const [userList, setUserList] = useState([]);

  const {
    employeeUserListData,
    employeeUserListSuccess,
    employeeUserListLoading,
  } = useSelector((state) => state.employeeUserList);
  const {
    updateEvaluationSuccess,
    updateEvaluationLoading,
    updateEvaluationError,
  } = useSelector((state) => state.updateEvaluation);

  useEffect(() => {
    dispatch(getListOfEmployeeUsers());
    return () => {
      dispatch({ type: EMPLOYEE_USER_LIST_RESET });
    };
  }, []);
  useEffect(() => {
    if (employeeUserListSuccess) {
      setUsers(employeeUserListData);
    }
  }, [employeeUserListSuccess]);
  useEffect(() => {
    if (updateEvaluationSuccess) {
      alert({ type: "success", message: "Empleados asignados con éxito" });
      dispatch({ type: UPDATE_EVALUATION_RESET });
      handleClose();
    }
  }, [updateEvaluationSuccess]);
  useEffect(() => {
    if (updateEvaluationError) {
      alert({ type: "error", message: updateEvaluationError });
    }
  }, [updateEvaluationError]);

  const handleAssignEmployee = () => {
    if (userList.length === 0) {
      alert({ type: "error", message: "Selecciona al menos un empleado" });
      return;
    }
    const body = {
      assignedUsers: userList.map((item) => ({ user: item._id })),
    };
    dispatch(updateEvaluation(evaluation?._id, body));
  };
  const handleClose = () => {
    onClose();
  };
  return (
    <CustomModal title="Asignar empleado" open={open} onClose={handleClose}>
      <div>
        <Row justify="space-evenly">
          <Col span={20}>
            <CustomSelect
              notFoundContent={"No se encontraron empleados"}
              loading={employeeUserListLoading}
              disabled={updateEvaluationLoading}
              label="Empleado"
              placeholder="Seleccione un empleado"
              style={{ width: "100%" }}
              onChange={(e) => setUserSelected(e)}
              options={users.map((item) => ({
                value: item._id,
                label: item?.name + " " + item?.lastName,
              }))}
            />
          </Col>
          <Col span={2} style={{ display: "flex", alignItems: "end" }}>
            <Button
              disabled={updateEvaluationLoading}
              icon={<PlusCircleOutlined />}
              onClick={() => {
                if (!userSelected) {
                  alert({ type: "error", message: "Selecciona un empleado" });
                  return;
                }
                const user = users.find((item) => item._id === userSelected);
                const userExist = userList.find(
                  (item) => item._id === userSelected
                );
                if (!userExist) {
                  setUserList((prev) => {
                    return [...prev, user];
                  });
                } else {
                  alert({
                    type: "error",
                    message: "Este usuario ya fue seleccionado",
                  });
                }
              }}
            />
          </Col>
        </Row>
        <Divider />
        <div
          style={{
            height: "calc(100vh - 390px)",
            maxHeight: "calc(100vh - 390px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Row justify="center">
            <Col span={22}>
              <List
                locale={{ emptyText: "Agrega empleados a la lista" }}
                itemLayout="horizontal"
                dataSource={userList}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={<span>{item?.name + " " + item?.lastName}</span>}
                      description={item?.email}
                    />
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </div>
        <Row justify="center">
          <Col span={4} style={{ marginTop: "20px" }}>
            <Button
              loading={updateEvaluationLoading}
              type="primary"
              onClick={handleAssignEmployee}
            >
              Asignar
            </Button>
          </Col>
        </Row>
      </div>
    </CustomModal>
  );
};

export default AssignUsersToEvaluationModal;

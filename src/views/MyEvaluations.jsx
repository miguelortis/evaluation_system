import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Button, Card, Col, Empty, Row } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import MyEvaluationsTable from "../components/MyEvaluationsTable/MyEvaluationTable";
import { getAssignedEvaluationsByEmployeeId } from "../redux/actions/evaluationActions";
import { ASSIGNED_EVALUATIONs_BY_EMPLOYEE_LIST_RESET } from "../redux/constants/evaluationConstants";
import { getLabelByStatus } from "../utils/formatters/get-label-by-status";

const MyEvaluations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [evaluationList, setEvaluationList] = useState([]);

  const {
    assignedEvaluationsByEmployeeListData,
    assignedEvaluationsByEmployeeListSuccess,
  } = useSelector((state) => state.assignedEvaluationsByEmployeeList);

  useEffect(() => {
    dispatch(getAssignedEvaluationsByEmployeeId());

    return () => {
      dispatch({ type: ASSIGNED_EVALUATIONs_BY_EMPLOYEE_LIST_RESET });
    };
  }, []);
  useEffect(() => {
    if (assignedEvaluationsByEmployeeListSuccess) {
      setEvaluationList(
        assignedEvaluationsByEmployeeListData.map((item, i) => ({
          key: i,
          name: item?.name,
          date: format(new Date(item?.createdAt), "dd/MM/yyyy"),
          status: getLabelByStatus(item?.assignedUsers?.status),
          actions: (
            <Button
              icon={<EditOutlined />}
              onClick={() => navigate(`/evaluations/response?id=${item?._id}`)}
            />
          ),
        }))
      );
    }
  }, [assignedEvaluationsByEmployeeListSuccess]);

  return (
    <Card>
      <Row justify="center">
        <Col span={24}>
          {assignedEvaluationsByEmployeeListData?.length > 0 ? (
            <MyEvaluationsTable evaluations={evaluationList} />
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No se encontraron datos"
            />
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default MyEvaluations;

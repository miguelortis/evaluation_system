import { Table } from "antd";
import { myEvaluationsTableColumns } from "./helpers/tableColumns";
import { useEffect, useState } from "react";
import { getAssignedEvaluationsByEmployeeId } from "../../redux/actions/evaluationActions";
import { useDispatch, useSelector } from "react-redux";
import { ASSIGNED_EVALUATIONs_BY_EMPLOYEE_LIST_RESET } from "../../redux/constants/evaluationConstants";
import { format } from "date-fns";

const MyEvaluationsTable = () => {
  const dispatch = useDispatch();
  const [evaluationList, setEvaluationList] = useState([]);

  const {
    assignedEvaluationsByEmployeeListData,
    assignedEvaluationsByEmployeeListSuccess,
    assignedEvaluationsByEmployeeListLoading,
    assignedEvaluationsByEmployeeListError,
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
        assignedEvaluationsByEmployeeListData.map((item) => ({
          name: item.name,
          date: format(new Date(item?.createdAt), "dd/MM/yyyy"),
        }))
      );
    }
  }, [assignedEvaluationsByEmployeeListSuccess]);

  return (
    <div>
      <Table columns={myEvaluationsTableColumns} dataSource={evaluationList} />;
    </div>
  );
};

export default MyEvaluationsTable;

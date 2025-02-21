import { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import AssignUsersToEvaluationModal from "../AssignUsersToEvaluationModal/AssignUsersToEvaluationModal";
import { evaluationsTableColumns } from "./helpers/tableColumns";

const EvaluationsTable = ({ evaluations }) => {
  const [evaluationList, setEvaluationList] = useState([]);
  const [evaluation, setEvaluation] = useState(null);
  const [OpenModal, setOpenModal] = useState(false);

  useEffect(() => {
    const list = evaluations?.map((item, i) => ({
      key: i,
      name: item?.name,
      date: format(new Date(item?.createdAt), "dd/MM/yyyy"),
      actions: (
        <Button
          onClick={() => [setOpenModal(true), setEvaluation(item)]}
          style={{ fontSize: "15px" }}
          icon={<EditOutlined style={{ fontSize: "15px" }} />}
          variant="link"
        />
      ),
    }));
    setEvaluationList(list);
  }, [evaluations]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Table columns={evaluationsTableColumns} dataSource={evaluationList} />;
      {OpenModal && (
        <AssignUsersToEvaluationModal
          open={OpenModal}
          onClose={handleCloseModal}
          evaluation={evaluation}
        />
      )}
    </>
  );
};

export default EvaluationsTable;

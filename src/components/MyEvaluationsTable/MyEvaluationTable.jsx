import { Table } from "antd";
import { myEvaluationsTableColumns } from "./helpers/tableColumns";

const MyEvaluationsTable = ({ evaluations }) => {
  return (
    <div>
      <Table columns={myEvaluationsTableColumns} dataSource={evaluations} />
    </div>
  );
};

export default MyEvaluationsTable;

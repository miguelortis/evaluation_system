import { useState, useEffect } from "react";
import EvaluationsTable from "../components/EvaluationsTable/EvaluationsTable";
import { Card, Col, Row, Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getEvaluationList } from "../redux/actions/evaluationActions";
import { EVALUATION_LIST_RESET } from "../redux/constants/evaluationConstants";

const EvaluationsView = () => {
  const dispatch = useDispatch();
  const [evaluations, setEvaluations] = useState([]);

  const { evaluationListData, evaluationListSuccess } = useSelector(
    (state) => state.evaluationList
  );

  useEffect(() => {
    dispatch(getEvaluationList());
    return () => {
      dispatch({ type: EVALUATION_LIST_RESET });
    };
  }, []);
  useEffect(() => {
    if (evaluationListSuccess) {
      setEvaluations(evaluationListData);
    }
  }, [evaluationListSuccess]);

  return (
    <Card>
      <Row justify="center">
        <Col span={24}>
          {evaluationListData?.length > 0 ? (
            <EvaluationsTable evaluations={evaluations} />
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

export default EvaluationsView;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Divider, Row, Typography } from "antd";
import useAlert from "../hooks/useAlert";
import useQuery from "../hooks/useQuery";
import DinamicInput from "../components/DinamicInput/DinamicInput";
import { getEvaluationById } from "../redux/actions/evaluationActions";
import { EVALUATION_BY_ID_RESET } from "../redux/constants/evaluationConstants";
import { evaluationResponseRegister } from "../redux/actions/evaluationResponseActions";
import { NEW_EVALUATION_RES_RESET } from "../redux/constants/evaluationResponseConstants";
import { convertArrayToObject } from "../utils/convert-array-to-object";

const { Title } = Typography;

const EvaluationResponse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { alert } = useAlert();
  const { getQuery } = useQuery();
  let id = getQuery("id");

  const [evaluation, setEvaluation] = useState({ name: "", fields: [] });
  const [responses, setResponses] = useState({});
  const [assigned, setAssigned] = useState({});

  const {
    evaluationResponseSuccess,
    evaluationResponseLoading,
    evaluationResponseError,
  } = useSelector((state) => state.evaluationResponse);
  const {
    evaluationByIdListData,
    evaluationByIdListSuccess,
    evaluationByIdListError,
  } = useSelector((state) => state.evaluationById);
  const { authData } = useSelector((state) => state.currentUser);

  useEffect(() => {
    dispatch(getEvaluationById(id));

    return () => {
      dispatch({ type: EVALUATION_BY_ID_RESET });
    };
  }, []);
  useEffect(() => {
    if (evaluationByIdListSuccess) {
      setEvaluation(evaluationByIdListData);
      setAssigned(
        evaluationByIdListData.assignedUsers.find(
          (item) => item.user === authData._id
        )
      );
      setResponses(convertArrayToObject(evaluationByIdListData.fields));
    }
  }, [evaluationByIdListSuccess]);
  useEffect(() => {
    if (evaluationByIdListError) {
      alert({
        type: "error",
        message: evaluationByIdListError,
      });
    }
  }, [evaluationByIdListError]);
  useEffect(() => {
    if (evaluationResponseSuccess) {
      alert({
        type: "success",
        message: "Respuestas enviadas con éxito",
      });
      dispatch({ type: NEW_EVALUATION_RES_RESET });
      navigate(`/evaluations/my`);
    }
  }, [evaluationResponseSuccess]);
  useEffect(() => {
    if (evaluationResponseError) {
      alert({
        type: "error",
        message: evaluationResponseError,
      });
    }
  }, [evaluationResponseError]);

  const handleSave = () => {
    const data = {
      evaluator: evaluation.createdBy,
      evaluationId: evaluation._id,
      responses: responses,
    };
    dispatch(evaluationResponseRegister(data));
  };

  return (
    <Card>
      <Row justify="start" gutter={50} style={{ margin: "10px 0" }}>
        <Col
          xs={{
            flex: "100%",
          }}
          sm={{
            flex: "50%",
          }}
        >
          <Title level={4}>{evaluation.name}</Title>
        </Col>
      </Row>
      <Divider />
      <Row justify="start" gutter={50} style={{ margin: "10px 0" }}>
        {evaluation.fields.map((field, i) => {
          return (
            <Col
              xs={{
                flex: "100%",
              }}
              sm={{
                flex: "50%",
              }}
              key={i}
            >
              <DinamicInput
                disabled={
                  evaluationResponseLoading || assigned?.status === "completed"
                }
                label={field.label}
                type={field.type}
                style={{ width: "100%" }}
                options={field.options}
                placeholder="Respuesta..."
                onChange={(e) => {
                  const responseList = responses;
                  if (e.target) {
                    responseList[field.id] = e.target.value;
                  } else {
                    responseList[field.id] = e;
                  }
                  setResponses(responseList);
                }}
              />
            </Col>
          );
        })}
      </Row>
      <Row justify="center">
        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
          {evaluationResponseLoading || assigned?.status === "completed" ? (
            <Button
              loading={evaluationResponseLoading}
              type="primary"
              onClick={() => navigate(`/evaluations/my`)}
            >
              Volver
            </Button>
          ) : (
            <Button
              loading={evaluationResponseLoading}
              type="primary"
              onClick={() => handleSave()}
            >
              Enviar Respuestas
            </Button>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default EvaluationResponse;

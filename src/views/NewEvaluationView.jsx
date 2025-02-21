import { Button, Card, Col, Divider, Row } from "antd";
import EvaluationModal from "../components/EvaluationModal/EvaluationModal";
import { useEffect, useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import CustomInput from "../components/Input/CustomInput";
import DinamicInput from "../components/DinamicInput/DinamicInput";
import { useDispatch, useSelector } from "react-redux";
import { evaluationRegister } from "../redux/actions/evaluationActions";
import useAlert from "../hooks/useAlert";
import { NEW_EVALUATION_RESET } from "../redux/constants/evaluationConstants";

const NewEvaluation = () => {
  const dispatch = useDispatch();
  const { alert } = useAlert();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [evaluation, setEvaluation] = useState({ name: "", fields: [] });

  const { evaluationSuccess, evaluationLoading, evaluationError } = useSelector(
    (state) => state.evaluationRegister
  );
  const { authData } = useSelector((state) => state.currentUser);

  useEffect(() => {
    if (evaluationSuccess) {
      alert({
        type: "success",
        message: "Evaluacion registrada con éxito",
      });
      resetForm();
    }
  }, [evaluationSuccess]);
  useEffect(() => {
    if (evaluationError) {
      alert({
        type: "error",
        message: evaluationError,
      });
    }
  }, [evaluationError]);

  const handleSave = () => {
    if (!evaluation.name) {
      alert({
        type: "error",
        message: "Debe agregar el nombre de la evaluacion",
      });
      return;
    }

    const data = {
      ...evaluation,
      createdBy: authData._id,
    };
    dispatch(evaluationRegister(data));
  };

  const resetForm = () => {
    setEvaluation({ name: "", fields: [] });
    dispatch({ type: NEW_EVALUATION_RESET });
  };

  return (
    <Card>
      <Row justify="end">
        <Col
          span={24}
          style={{ display: "flex", justifyContent: "end", padding: "0 10px" }}
        >
          <Button
            disabled={evaluationLoading}
            type="primary"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusCircleOutlined />
            Agregar Campo
          </Button>
        </Col>
      </Row>
      <Row justify="start" gutter={50} style={{ margin: "10px 0" }}>
        <Col
          xs={{
            flex: "100%",
          }}
          sm={{
            flex: "50%",
          }}
        >
          <CustomInput
            label="Nombre de la evaluacion"
            placeholder="Escribe un nombre para la evaluación"
            value={evaluation.name}
            disabled={evaluationLoading}
            onChange={(e) =>
              setEvaluation((prev) => ({ ...prev, name: e.target.value }))
            }
          />
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
                label={field.label}
                name={field.name}
                type={field.type}
                style={{ width: "100%" }}
                options={field.options}
                placeholder="Respuesta..."
                disabled
              />
            </Col>
          );
        })}
      </Row>
      {evaluation.fields.length > 0 && (
        <Row justify="center">
          <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
            <Button
              loading={evaluationLoading}
              type="primary"
              onClick={() => handleSave(true)}
            >
              Guardar Evaluación
            </Button>
          </Col>
        </Row>
      )}
      {isModalOpen && (
        <EvaluationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onChange={(e) =>
            setEvaluation((prev) => ({ ...prev, fields: [...prev.fields, e] }))
          }
        />
      )}
    </Card>
  );
};

export default NewEvaluation;

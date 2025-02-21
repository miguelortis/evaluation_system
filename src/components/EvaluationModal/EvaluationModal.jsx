import { useState } from "react";
import { Button, Col, Form, Row, Tooltip } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import CustomModal from "../Modal/CustomModal";
import CustomSelect from "../Select/CustomSelect";
import CustomInput from "../Input/CustomInput";
import { inputTypes } from "../../utils/enums/input-types";
import useAlert from "../../hooks/useAlert";

const EvaluationModal = ({ isOpen, onClose, onChange }) => {
  const { alert } = useAlert();
  const [form] = Form.useForm();
  const [type, setType] = useState("");
  const [options, setOptions] = useState([]);
  const [inputStatus, setInputStatus] = useState("");

  const addOption = () => {
    const value = options.length + 1;
    setOptions((prev) => [...prev, { value: value, label: value }]);
  };
  const handleOptionChange = (index, value) => {
    const newOptions = options.map((option, i) =>
      i === index ? { value: value, label: value } : option
    );
    setOptions(newOptions);
    validateOptions(newOptions);
  };
  const validateOptions = (options) => {
    const values = options.map((option) => option.value);
    const duplicates = values.filter(
      (value, index) => values.indexOf(value) !== index
    );
    setInputStatus(duplicates.length > 0 ? "error" : "");
  };
  const handleSave = (value) => {
    if (inputStatus) {
      alert({ type: "error", message: "Hay opciones duplicadas" });
      return;
    }
    const data = {
      ...value,
      type,
      id: Date.now(),
    };
    if (options.length > 0) {
      data.options = options;
    }
    onChange && onChange(data);
    handleClose();
  };
  const handleClose = () => {
    onClose();
    setType("");
    setOptions([{ value: 1, label: 1 }]);
    form.resetFields();
  };
  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    validateOptions(newOptions);
  };

  return (
    <CustomModal title="Nuevo Campo" open={isOpen} onClose={handleClose}>
      <Form form={form} name="basic" onFinish={handleSave} autoComplete="off">
        <Row justify="center">
          <Col span={24}>
            <Form.Item
              name="label"
              rules={[
                {
                  required: true,
                  message: "¡Por favor ingrese el titulo del campo!",
                },
              ]}
            >
              <CustomInput
                label="Pregunta"
                placeholder="Escriba el titulo del campo"
                disabled={!type}
                addonBefore={
                  <CustomSelect
                    placeholder="Tipo de campo"
                    options={[
                      { value: inputTypes.TEXT, label: "Texto" },
                      { value: inputTypes.NUMBER, label: "Número" },
                      { value: inputTypes.RADIO, label: "Radio" },
                      { value: inputTypes.SELECT, label: "Seleccion" },
                    ]}
                    onChange={(value) => {
                      if (
                        value !== inputTypes.SELECT &&
                        value !== inputTypes.RADIO
                      ) {
                        setOptions([]);
                      } else {
                        setOptions([{ value: "1", label: 1 }]);
                      }
                      setType(value);
                    }}
                    style={{ width: "140px" }}
                  />
                }
              />
            </Form.Item>
          </Col>
          {(type === inputTypes.RADIO || type === inputTypes.SELECT) && (
            <Col span={24}>
              <Row justify="end">
                <Col
                  span={12}
                  style={{ display: "flex", justifyContent: "end" }}
                >
                  <Tooltip title="Agregar opción">
                    <Button variant="text" color="primary" onClick={addOption}>
                      <PlusCircleOutlined style={{ fontSize: 20 }} />
                      Agregar opción
                    </Button>
                  </Tooltip>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Opciones:</span>
                </Col>
              </Row>
              <Row gutter={20}>
                {options.map((op, i) => {
                  return (
                    <Col
                      key={i}
                      xs={{
                        flex: "100%",
                      }}
                      sm={{
                        flex: "50%",
                      }}
                    >
                      <div
                        className="radio-options"
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span>{i + 1}:</span>
                        <CustomInput
                          className="input-options"
                          placeholder="Escriba el titulo del campo"
                          value={op?.label}
                          onChange={(e) =>
                            handleOptionChange(i, e?.target?.value)
                          }
                          status={
                            inputStatus &&
                            options.filter(
                              (option) => option.value === op.value
                            ).length > 1
                              ? "error"
                              : ""
                          }
                          addonAfter={
                            <Button
                              type="link"
                              onClick={() => removeOption(i)}
                              icon={
                                <Tooltip title="Eliminar opción">
                                  <MinusCircleOutlined
                                    style={{ fontSize: "15px", color: "red" }}
                                  />
                                </Tooltip>
                              }
                            />
                          }
                        />
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          )}
        </Row>
        <Row justify="center">
          <Col
            span={24}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Guardar
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </CustomModal>
  );
};

export default EvaluationModal;

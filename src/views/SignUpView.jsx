import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { Button, Typography, Form, Input } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import useAlert from "../hooks/useAlert";
import { REGISTER_USER_RESET } from "../redux/constants/authConstants";
import { registerUser } from "../redux/actions/authActions";

const { Title } = Typography;

const SignUp = () => {
  const [form] = Form.useForm();
  const { alert } = useAlert();
  const dispatch = useDispatch();

  const {
    registerUserData,
    registerUserSuccess,
    registerUserLoading,
    registerUserError,
  } = useSelector((state) => state.registerUser);

  useEffect(() => {
    if (registerUserSuccess) {
      form.resetFields();
      alert({ type: "success", message: registerUserData });
      dispatch({ type: REGISTER_USER_RESET });
    }
  }, [registerUserSuccess, registerUserData, alert, dispatch, form]);

  useEffect(() => {
    if (registerUserError) {
      alert({ type: "error", message: registerUserError });
      dispatch({ type: REGISTER_USER_RESET });
    }
  }, [registerUserError, alert, dispatch]);

  const handleSubmit = async (values) => {
    dispatch(registerUser(values));
  };

  return (
    <div>
      <Title className="mb-15">Registrarse</Title>
      <Title className="font-regular text-muted" level={5}>
        Ingresa tus datos para registrarte!
      </Title>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className="row-col"
      >
        <Form.Item
          className="username"
          label="Nombre"
          name="name"
          rules={[
            {
              required: true,
              message: "¡Por favor ingrese su nombre!",
            },
          ]}
        >
          <Input placeholder="Ingrese su nombre" />
        </Form.Item>
        <Form.Item
          className="username"
          label="Apellido"
          name="lastName"
          rules={[
            {
              required: true,
              message: "¡Por favor ingrese su apellido!",
            },
          ]}
        >
          <Input placeholder="Ingrese su apellido" />
        </Form.Item>
        <Form.Item
          className="username"
          label="Correo"
          name="email"
          rules={[
            {
              required: true,
              message: "¡Por favor ingrese su correo electrónico!",
            },
          ]}
        >
          <Input type="email" placeholder="Ingrese su Correo" />
        </Form.Item>
        <Form.Item
          className="username"
          label="Contraseña"
          name="password"
          rules={[
            {
              required: true,
              message: "¡Por favor ingrese su contraseña!",
            },
          ]}
        >
          <Input type="password" placeholder="Ingrese su Contraseña" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            loading={
              registerUserLoading
                ? { icon: <SyncOutlined style={{ fontSize: 15 }} spin /> }
                : null
            }
          >
            REGISTRAR USUARIO
          </Button>
        </Form.Item>
        <p className="font-semibold text-muted">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/sign-in" className="text-dark font-bold">
            Inicia Sesión
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default SignUp;

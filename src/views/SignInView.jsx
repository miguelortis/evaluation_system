import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography, Form, Input } from "antd";
import useAlert from "../hooks/useAlert";
import { loginUser } from "../redux/actions/authActions";
import { CURRENT_USER_RESET } from "../redux/constants/authConstants";
import { SyncOutlined } from "@ant-design/icons";

const { Title } = Typography;

const SignIn = () => {
  const { alert } = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authSuccess, authLoading, authError } = useSelector(
    (state) => state.currentUser
  );

  useEffect(() => {
    if (authSuccess) {
      navigate("/");
    }
  }, [authSuccess, navigate]);
  useEffect(() => {
    if (authError) {
      alert({ type: "error", message: authError });
      dispatch({ type: CURRENT_USER_RESET });
    }
  }, [authError, alert, dispatch]);

  const handleSubmit = async (values) => {
    dispatch(loginUser(values));
  };

  return (
    <div>
      <Title className="mb-15">Iniciar Sesión</Title>
      <Title className="font-regular text-muted" level={5}>
        Ingresa tu email y contraseña para iniciar sesión
      </Title>
      <Form onFinish={handleSubmit} layout="vertical" className="row-col">
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
          <Input placeholder="Ingrese su Contraseña" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            loading={
              authLoading
                ? { icon: <SyncOutlined style={{ fontSize: 15 }} spin /> }
                : null
            }
          >
            INICIAR SESIÓN
          </Button>
        </Form.Item>
        <p className="font-semibold text-muted">
          ¿No tienes una cuenta?{" "}
          <Link to="/sign-up" className="text-dark font-bold">
            Registrate
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default SignIn;

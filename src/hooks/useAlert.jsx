import { notification } from "antd";

const useAlert = () => {
  const alert = ({ type, message }) => {
    notification[type]({
      message: message,
    });
  };

  return { alert };
};

export default useAlert;

import { Input, Typography } from "antd";

const CustomInput = ({ label, ...props }) => {
  return (
    <div className="custom-input">
      {label && (
        <div className="input-label">
          <Typography.Text level={5}>{label}</Typography.Text>
        </div>
      )}
      <Input {...props} />
    </div>
  );
};

export default CustomInput;

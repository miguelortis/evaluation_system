import { Radio, Typography } from "antd";

const CustomRadio = ({ label, ...props }) => {
  return (
    <div className="custom-input">
      {label && (
        <div className="input-label">
          <Typography.Text level={5}>{label}</Typography.Text>
        </div>
      )}
      <Radio.Group {...props} />
    </div>
  );
};
export default CustomRadio;

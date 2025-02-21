import { Select, Typography } from "antd";

const CustomSelect = ({ label, ...props }) => {
  return (
    <div>
      {label && (
        <div className="input-label">
          <Typography.Text level={5}>{label}</Typography.Text>
        </div>
      )}
      <Select {...props} />
    </div>
  );
};

export default CustomSelect;

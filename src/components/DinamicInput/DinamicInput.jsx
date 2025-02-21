import { inputTypes } from "../../utils/enums/input-types";
import CustomInput from "../Input/CustomInput";
import CustomRadio from "../Radio/CustomRadio";
import CustomSelect from "../Select/CustomSelect";

const DinamicInput = ({ type, ...props }) => {
  if (type === inputTypes.TEXT || type === inputTypes.NUMBER) {
    return <CustomInput type={type} {...props} />;
  }
  if (type === inputTypes.RADIO) {
    return <CustomRadio {...props} />;
  }
  if (type === inputTypes.SELECT) {
    return <CustomSelect {...props} />;
  }
};

export default DinamicInput;

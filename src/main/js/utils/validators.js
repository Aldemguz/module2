import { ValidatorForm } from 'react-material-ui-form-validator';
import { URL_REGEX } from "bucares/constants/app";

ValidatorForm.addValidationRule("isUrl", (value) => {
  let regex = RegExp(URL_REGEX);
  return regex.test(value);
});

ValidatorForm.addValidationRule("maxLength", (value, length) => {
  if (!value) {
    return 0 <= length;
  }
  return value.length <= length;
});
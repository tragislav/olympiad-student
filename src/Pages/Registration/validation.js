import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().min(4).max(7).required(),
  password: yup.string().min(4).max(16).required(),
  repeatPassword: yup.string().min(4).max(16).required(),
  email: yup.string().required(),
});

export default schema;

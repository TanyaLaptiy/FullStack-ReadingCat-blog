import * as yup from 'yup';

export const LoginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(10, 'Invalid password').required(),
  })
  .required();

import * as yup from 'yup';
import { LoginSchema } from './loginSchems';

export const RegisterSchema = yup
  .object({
    fullName: yup.string().min(5, 'Invalid nickname').required(),
  })
  .concat(LoginSchema);

import React from 'react';
import { TextField } from '@material-ui/core';
import styles from './Auth.module.scss';
import { useForm } from 'react-hook-form';
import { LoginSchema } from './utils/loginSchems';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import { Api } from '../../services/api';
import { LoginUserType } from '../../services/api/types';
import { setCookie } from 'nookies';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useAppDispatch } from '../../redux/store';
import { setUserData } from '../../redux/slices/userSlice';
import { useRouter } from 'next/router';
interface LoginProps {
  onClick: (elem: boolean) => void;
}
export const LoginBlock: React.FC<LoginProps> = (props) => {
  const [errorMessage, setErrorMessage] = React.useState(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginSchema),
  });

  const onClickRegister = () => {
    props.onClick(true);
  };

  const onSubmit = async (values: LoginUserType) => {
    try {
      const data = await Api().userAPI.login(values);
      // const data = await UserApi.login(values);
      setCookie(null, 'access_token', data.access_token, {
        maxAge: 30 * 24 * 60 * 60, //30 days
        path: '/',
      });
      setErrorMessage(null);
      dispatch(setUserData(data));
      router.push(`/profile/${data.id}`);
    } catch (e) {
      console.log(e);
      if (e.response) {
        setErrorMessage(e.response.data.message);
      }
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className={styles.registerArea}>
        <h3>Login by email</h3>
        {errorMessage && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {errorMessage} — <strong>check it out!</strong>
          </Alert>
        )}
        <TextField
          {...form.register('email', { required: 'Укажите почту' })}
          error={Boolean(form.formState.errors.email?.message)}
          helperText={form.formState.errors.email?.message}
          margin="normal"
          size="small"
          label={'Email'}
          variant="outlined"
          fullWidth
          required
        />

        <TextField
          {...form.register('password', { required: 'Укажите пароль' })}
          error={Boolean(form.formState.errors.password?.message)}
          helperText={form.formState.errors.password?.message}
          margin="normal"
          size="small"
          label="Password"
          variant="outlined"
          fullWidth
          required
        />

        <em>
          If you are not registered yet: <u onClick={onClickRegister}>Registration</u>
        </em>

        <Button
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          type="submit"
          variant="contained"
          fullWidth
          autoFocus>
          Apply
        </Button>
      </div>
    </form>
  );
};

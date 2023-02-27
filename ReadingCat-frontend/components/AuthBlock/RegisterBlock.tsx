import React from 'react';
import { setCookie } from 'nookies';
import { TextField } from '@material-ui/core';
import styles from './Auth.module.scss';
import { useForm } from 'react-hook-form';
import { RegisterSchema } from './utils/registerSchems';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import { UserApi } from '../../services/api/user';
import { CreateUserType } from '../../services/api/types';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useAppDispatch } from '../../redux/store';
import { setUserData } from '../../redux/slices/userSlice';
import { Api } from '../../services/api';
import { useRouter } from 'next/router';
interface RegisterProps {
  onClick: (elem: boolean) => void;
}

export const RegisterBlock: React.FC<RegisterProps> = (props) => {
  const [errorMessage, setErrorMessage] = React.useState(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = async (values: CreateUserType) => {
    try {
      const data = await Api().userAPI.register(values);
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

  const onClickRegister = () => {
    props.onClick(false);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className={styles.registerArea}>
        <h3>Registration by email</h3>
        {errorMessage && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {errorMessage} — <strong>check it out!</strong>
          </Alert>
        )}
        <TextField
          {...form.register('fullName', { required: 'Укажите username' })}
          error={Boolean(form.formState.errors.username?.message)}
          helperText={form.formState.errors.username?.message}
          margin="normal"
          size="small"
          label={'Nickname'}
          variant="outlined"
          fullWidth
          required
        />
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
          If you are already registered: <u onClick={onClickRegister}>Login</u>{' '}
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

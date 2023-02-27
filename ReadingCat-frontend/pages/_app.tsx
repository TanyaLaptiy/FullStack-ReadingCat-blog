import Head from 'next/head';
import { Header } from '../components/Header';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { theme } from '../theme';
import { store, wrapper } from '../redux/store';
import { Provider } from 'react-redux';

import '../styles/globals.scss';
import 'macro-css';
import { Component } from 'react';
import { parseCookies } from 'nookies';
import { UserApi } from '../services/api/user';
import { setUserData } from '../redux/slices/userSlice';
import { Api } from '../services/api';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>ReadingCat</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Component {...pageProps} />
      </MuiThemeProvider>
    </>
  );
}

MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async ({ ctx, Component }) => {
  try {
    const userData = await Api(ctx).userAPI.getMyInfo();

    store.dispatch(setUserData(userData));
  } catch (err) {
    if (ctx.asPath === '/write') {
      ctx.res.writeHead(302, {
        //Формируем запрос
        Location: '/403',
      });
      ctx.res.end(); //Не забываем закрыть запрос
    }
    console.log(err);
  }
  return {
    pageProps: {
      ...(Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {}),
      pathname: ctx.pathname,
    },
  };
});
export default wrapper.withRedux(MyApp);

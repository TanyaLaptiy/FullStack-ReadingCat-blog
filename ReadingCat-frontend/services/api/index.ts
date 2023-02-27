import axios from 'axios';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import Cookies, { parseCookies } from 'nookies';
import { PostApi } from './post';
import { UserApi } from './user';
import { CommentApi } from './comment';

export type ApiReturnType = {
  userAPI: ReturnType<typeof UserApi>;
  postAPI: ReturnType<typeof PostApi>;
  commentAPI: ReturnType<typeof CommentApi>;
};

//Если функция не получит из nextJS контекст, то cookie будут парситься из браузера (document.cookie)
export const Api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiReturnType => {
  const { access_token } = ctx ? Cookies.get(ctx) : parseCookies();
  // const token = cookies.access_token;
  const instance = axios.create({
    baseURL: typeof window === 'undefined' ? 'http://localhost:8888' : 'http://localhost:8888',
    headers: {
      Authorization: 'Bearer ' + access_token,
    },
  });

  return {
    userAPI: UserApi(instance),
    postAPI: PostApi(instance),
    commentAPI: CommentApi(instance),
  };
};

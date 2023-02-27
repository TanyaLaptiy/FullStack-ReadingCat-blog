import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { MainLayout } from '../../layouts/MainLayout';
import { WriteForm } from '../../components/WriteForm';
import { Api } from '../../services/api';
import { ResponsePostType } from '../../services/api/types';

interface WritePageProps {
  post: ResponsePostType;
}
const WritePage: NextPage<WritePageProps> = (props) => {
  return (
    <MainLayout className="main-layout-white" hideComments hideMenu>
      <WriteForm data={props.post} />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const user = await Api(ctx).userAPI.getMyInfo();
    const post = await Api().postAPI.getPostById(+ctx.params.id);

    if (user.id !== post.ownerId.id) {
      return {
        props: {},
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    return { props: { post } };
  } catch (err) {
    console.log(err);
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default WritePage;

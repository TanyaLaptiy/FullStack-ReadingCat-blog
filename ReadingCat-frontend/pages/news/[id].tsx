import { MainLayout } from '../../layouts/MainLayout';
import { FullPost } from '../../components/FullPost';
import React from 'react';
import { PostComments } from '../../components/PostComments';
import { GetServerSideProps, NextPage } from 'next';
import { ResponsePostType } from '../../services/api/types';
import { Api } from '../../services/api';

interface FullPageProps {
  post: ResponsePostType;
}
const Post: NextPage<FullPageProps> = (props) => {
  return (
    <MainLayout contentFullWidth>
      <FullPost data={props.post} />
      <PostComments postId={props.post.id} />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const post = await Api().postAPI.getPostById(+ctx.params.id);

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

export default Post;

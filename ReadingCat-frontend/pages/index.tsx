import { NextPage } from 'next';
import { Post } from '../components/Post';
import { MainLayout } from '../layouts/MainLayout';
import { Api } from '../services/api';
import { ResponsePostType } from '../services/api/types';

interface HomeProps {
  posts: ResponsePostType[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <MainLayout>
      {posts.map((postData) => (
        <Post
          key={postData.id}
          id={postData.id}
          title={postData.title}
          secondTitle={postData.secondTitle}
        />
      ))}
    </MainLayout>
  );
};

export const getServerSideProps = async () => {
  try {
    const posts = await Api().postAPI.getAllPosts();
    return { props: { posts } };
  } catch (err) {
    console.log(err);
  }
  return { props: { posts: null } };
};
export default Home;

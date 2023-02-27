import React from 'react';
import styles from './SideComments.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { Api } from '../../services/api';
import { ResponsePostType } from '../../services/api/types';
interface CommentItemProps {
  ownerId: {
    id: number;
    fullName: string;
    avatarUrl?: string;
  };
  text: string;
  postId: number;
}

export const CommentItem: React.FC<CommentItemProps> = ({ ownerId, text, postId }) => {
  const [post, setPost] = React.useState<ResponsePostType>();
  React.useEffect(() => {
    async function asyncThunk() {
      try {
        const post = await Api().postAPI.getPostById(postId);
        setPost(post);
      } catch (err) {
        console.log(err);
      }
    }
    asyncThunk();
  }, []);
  return (
    <div className={styles.commentItem}>
      <div className={styles.userInfo}>
        <img
          src={ownerId.avatarUrl || 'https://img.freepik.com/free-icon/people_318-399336.jpg'}
          alt="Avatar"
        />

        <Link href={`/profile/${ownerId.id}`}>
          <a>
            <b>{ownerId.fullName}</b>
          </a>
        </Link>
      </div>
      <p className={styles.text}>{text}</p>

      {post && (
        <Link href={`/news/${post.id}`}>
          <a>
            <span className={styles.postTitle}>{post.title}</span>
          </a>
        </Link>
      )}
    </div>
  );
};

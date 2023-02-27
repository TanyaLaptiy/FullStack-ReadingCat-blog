import React from 'react';
import { Divider, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import { Comment } from '../Comment';
import { AddCommentForm } from '../AddCommentForm';
import styles from './PostComments.module.scss';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import { Api } from '../../services/api';
import { ResponseCommentType } from '../../services/api/types';

interface PostConnentsProps {
  postId: number;
}

export const PostComments: React.FC<PostConnentsProps> = (props) => {
  const isAuth = useSelector(selectUser);
  const [activeTab, setActiveTab] = React.useState(0);
  const [comments, setComments] = React.useState<ResponseCommentType[]>([]);
  // const comments = data.comments[activeTab === 0 ? 'popular' : 'new'];

  React.useEffect(() => {
    async function asyncThunk() {
      try {
        const comments = await Api().commentAPI.getAllCommentsByPostId(props.postId);
        setComments(comments);
      } catch (err) {
        console.log(err);
      }
    }
    asyncThunk();
  }, []);

  const clickOnAddNewComment = (newComment: ResponseCommentType) => {
    setComments((prev) => [...prev, newComment]);
  };

  const clickOnDeleteComment = (commentId: number) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
  };
  return (
    <Paper elevation={0} className="mt-40 p-30">
      <div className={styles.container}>
        <Typography variant="h6" className="mb-20">
          42 комментария
        </Typography>
        <Tabs
          onChange={(event, newValue) => setActiveTab(newValue)}
          className="mt-20"
          value={activeTab}
          //   indicatorColor="primary"
          //   textColor="primary"
        >
          <Tab label="Popular" />
          <Tab label="New ones first" />
        </Tabs>
        <Divider />

        <div className="mb-20" />
        <div className={styles.comments}>
          {comments.map((obj) => (
            <Comment
              key={obj.id}
              id={obj.id}
              user={obj.ownerId}
              currentUserId={isAuth?.id || -1}
              text={obj.text}
              createdAt={obj.createdAt}
              onClickDelete={clickOnDeleteComment}
            />
          ))}
        </div>
        {isAuth ? (
          <AddCommentForm onClick={clickOnAddNewComment} postId={props.postId} />
        ) : (
          <em>* Comments can only be written by registered users</em>
        )}
      </div>
    </Paper>
  );
};

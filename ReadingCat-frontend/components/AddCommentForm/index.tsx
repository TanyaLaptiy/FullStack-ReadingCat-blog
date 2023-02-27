import React from 'react';
import Input from '@material-ui/core/Input';
import styles from './AddCommentForm.module.scss';
import { Button } from '@material-ui/core';
import { Api } from '../../services/api';
import { ResponseCommentType } from '../../services/api/types';

interface AddCommentFormProps {
  postId: number;
  onClick: (comment: ResponseCommentType) => void;
}

export const AddCommentForm: React.FC<AddCommentFormProps> = (props) => {
  const [clicked, setClicked] = React.useState(false);
  const [text, setText] = React.useState('');
  const [loading, setIsLoading] = React.useState(false);

  const onClickAddComment = async () => {
    try {
      setIsLoading(true);
      const comment = await Api().commentAPI.createComment({
        postId: props.postId,
        text,
      });

      props.onClick(comment);
      setClicked(false);
      setText('');
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.form}>
      <Input
        disabled={loading}
        onChange={(e) => setText(e.target.value)}
        value={text}
        onFocus={() => setClicked(true)}
        minRows={clicked ? 5 : 1}
        classes={{ root: styles.fieldRoot }}
        placeholder="Write a comment..."
        fullWidth
        multiline
      />
      {clicked && (
        <Button
          disabled={loading}
          onClick={onClickAddComment}
          className={styles.addButton}
          variant="contained"
          style={{ backgroundColor: '#9be1f3' }}>
          Publish
        </Button>
      )}
    </div>
  );
};

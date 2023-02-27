import React from 'react';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import styles from './SideComments.module.scss';
import { CommentItem } from './CommentItem';
import clsx from 'clsx';
import { Api } from '../../services/api';
import { ResponseCommentType } from '../../services/api/types';

export const SideComments = () => {
  const [visible, setVisible] = React.useState(true);
  const [comments, setComments] = React.useState<ResponseCommentType[]>([]);

  const onClickVisible = () => {
    setVisible(!visible);
  };

  React.useEffect(() => {
    async function asyncThunk() {
      try {
        const comments = await Api().commentAPI.getAllComments();
        setComments(comments);
      } catch (err) {
        console.log(err);
      }
    }
    asyncThunk();
  }, []);

  return (
    <div className={clsx(styles.root, !visible && styles.rotated)}>
      <h3 onClick={onClickVisible}>
        Comments <KeyboardDoubleArrowRightOutlinedIcon />
      </h3>
      {visible && comments.map((obj) => <CommentItem key={obj.id} {...obj} />)}
    </div>
  );
};

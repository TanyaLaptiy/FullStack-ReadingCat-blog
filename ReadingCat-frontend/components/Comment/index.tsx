import React from 'react';
import { Typography, IconButton, MenuItem, Menu, Avatar } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreHorizOutlined';

import styles from './Comment.module.scss';
import { Api } from '../../services/api';

interface CommentPostProps {
  user: {
    id: number;
    fullName: string;
    avatarUrl?: string;
  };
  id: number;
  currentUserId: number;
  text: string;
  createdAt: string;
  onClickDelete: (commentId: number) => void;
}

export const Comment: React.FC<CommentPostProps> = ({
  id,
  user,
  text,
  createdAt,
  currentUserId,
  onClickDelete,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const clickOnDelete = async () => {
    if (window.confirm('Are you sure you want to delete the comment?')) {
      try {
        const res = await Api().commentAPI.deleteComment(id);
        onClickDelete(id);
      } catch (err) {
        console.log(err);
      }
    }
    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.comment}>
      <div className={styles.userInfo}>
        <img
          src={user.avatarUrl || 'https://img.freepik.com/free-icon/people_318-399336.jpg'}
          alt="Avatar"
        />
        <b>{user.fullName}</b>
        <span>{createdAt}</span>
      </div>
      <Typography className={styles.text}>{text}</Typography>
      {user.id === currentUserId && (
        <>
          <span className={styles.replyBtn}>Ответить</span>

          <IconButton onClick={handleClick}>
            <MoreIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            elevation={2}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            keepMounted>
            <MenuItem onClick={clickOnDelete}>Удалить</MenuItem>
            <MenuItem onClick={handleClose}>Редактировать</MenuItem>
          </Menu>
        </>
      )}
    </div>
  );
};

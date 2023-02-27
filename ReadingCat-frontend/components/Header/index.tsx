import React from 'react';
import Link from 'next/link';
import { Paper, Button, IconButton, Avatar, ListItem, List } from '@material-ui/core';

import {
  Menu as MenuIcon,
  NotificationsNoneOutlined as NotificationIcon,
} from '@material-ui/icons';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import styles from './Header.module.scss';
// import {AuthBlock} from '../AuthBlock';
import { Auth } from '../AuthBlock';
import { useAppSelector } from '../../redux/store';
import { selectUser } from '../../redux/slices/userSlice';
import { useSelector } from 'react-redux';
import { ResponsePostType } from '../../services/api/types';
import { Api } from '../../services/api';
export const Header: React.FC = () => {
  const userData = useSelector(selectUser);
  const [result, setResult] = React.useState<ResponsePostType[]>([]);
  const [searchValue, setSearchValue] = React.useState('');

  const [visible, setVisible] = React.useState(false);

  const openWindow = () => {
    setVisible(true);
  };

  React.useEffect(() => {
    if (visible && userData) {
      setVisible(false);
    }
  }, [visible, userData]);

  const onClickChangeInput = async (event) => {
    setSearchValue(event.target.value);
    try {
      const posts = await Api().postAPI.searchPost({ title: event.target.value });
      setResult(posts.items);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Paper classes={{ root: styles.root }} elevation={0}>
      <div className="d-flex align-center">
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Link href="/">
          <a>
            <img height={40} className="mr-20" src="/static/img/logo.svg" alt="CatReading" />
          </a>
        </Link>

        <div className={styles.searchBlock}>
          <SearchOutlinedIcon />
          <input value={searchValue} onChange={onClickChangeInput} placeholder="Search" />
          {result.length > 0 && (
            <Paper className={styles.searchBlockPipub}>
              <List>
                {result.map((post) => (
                  <Link key={post.id} href={`/news/${post.id}`}>
                    <a>
                      <ListItem button key={post.id}>
                        {post.title}
                      </ListItem>
                    </a>
                  </Link>
                ))}
              </List>
            </Paper>
          )}
        </div>
      </div>
      <div className="d-flex align-center">
        {userData && (
          <Link href="/write">
            <a>
              <Button variant="contained" className={styles.penButton}>
                Write article
              </Button>
            </a>
          </Link>
        )}

        <IconButton>
          <SmsOutlinedIcon />
        </IconButton>

        <IconButton>
          <NotificationIcon />
        </IconButton>

        {userData ? (
          <Link href="/profile/1">
            <a className="d-flex align-center">
              <Avatar
                className={styles.avatar}
                alt="Remy Sharp"
                src="https://leonardo.osnova.io/5ffeac9a-a0e5-5be6-98af-659bfaabd2a6/-/scale_crop/108x108/-/format/webp/"
              />
            </a>
          </Link>
        ) : (
          <IconButton onClick={openWindow}>
            <VpnKeyOutlinedIcon />
          </IconButton>
        )}
      </div>

      <Auth visible={visible} onClick={setVisible} />
      {/* <Dialog
        maxWidth="sm"
        fullWidth
        fullScreen={false}
        open={visible}
        onClose={() => {}}
        aria-labelledby="responsive-dialog-title">
        <DialogContent>
          <DialogContentText>

            <div className={styles.authForm}>
              <div className={styles.imageArea}>
                <h1>ReadingCat</h1>
                <img height={200} src="/static/img/logo.svg" alt="CatReading" />
              </div>
              <div className={styles.buttonArea}>
                <Button startIcon={<FacebookOutlinedIcon />} variant="outlined">
                  Facebook
                </Button>
                <Button startIcon={<LanguageOutlinedIcon />} variant="outlined">
                  Google
                </Button>
                <Button startIcon={<EmailOutlinedIcon />} variant="outlined">
                  Gmail
                </Button>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={closeWindow}>
            Close
          </Button>
          <Button onClick={clickOnApply} autoFocus>
            Apply
          </Button>
        </DialogActions>
      </Dialog> */}
    </Paper>
  );
};

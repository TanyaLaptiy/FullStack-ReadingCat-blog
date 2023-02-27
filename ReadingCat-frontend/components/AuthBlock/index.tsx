import React from 'react';
import { Button, Dialog, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import styles from './Auth.module.scss';
import Link from 'next/link';

import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ReplyAllOutlinedIcon from '@mui/icons-material/ReplyAllOutlined';
import { LoginBlock } from './LoginBlock';
import { RegisterBlock } from './RegisterBlock';

interface AuthProps {
  visible: boolean;
  onClick: (visible: boolean) => void;
}
export const Auth: React.FC<AuthProps> = (props) => {
  const [byMail, setByMail] = React.useState<boolean>(false);
  const [isRegister, setIsRegister] = React.useState<boolean>(false);

  const onClickByMail = () => {
    setByMail(!byMail);
  };
  const closeWindow = () => {
    props.onClick(false);
    // setByMail(false);
  };

  const clickOnApply = () => {
    //
    closeWindow();
    alert('!!!!!!!!!!!!!');
    // setByMail(false);
  };

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      fullScreen={false}
      open={props.visible}
      onClose={() => {}}
      aria-labelledby="responsive-dialog-title">
      <DialogContent>
        <DialogContentText>
          <div className={styles.authForm}>
            <div className={styles.imageArea}>
              <h1>ReadingCat</h1>
              <img height={200} src="/static/img/logo.svg" alt="CatReading" />
            </div>
            {byMail ? (
              <>
                {isRegister ? (
                  <RegisterBlock onClick={setIsRegister} />
                ) : (
                  <LoginBlock onClick={setIsRegister} />
                )}
              </>
            ) : (
              <div className={styles.buttonArea}>
                <Button startIcon={<FacebookOutlinedIcon />} variant="outlined">
                  Facebook
                </Button>
                <Button startIcon={<LanguageOutlinedIcon />} variant="outlined">
                  Google
                </Button>
                <Button
                  onClick={onClickByMail}
                  startIcon={<EmailOutlinedIcon />}
                  variant="outlined">
                  Gmail
                </Button>
              </div>
            )}
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {byMail ? (
          <>
            <Button startIcon={<ReplyAllOutlinedIcon />} autoFocus onClick={onClickByMail}>
              Back
            </Button>
          </>
        ) : (
          <Button autoFocus onClick={closeWindow}>
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

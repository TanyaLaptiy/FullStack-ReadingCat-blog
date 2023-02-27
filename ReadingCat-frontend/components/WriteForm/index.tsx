import React from 'react';
import { Button, Input } from '@material-ui/core';
import styles from './WriteForm.module.scss';
import dynamic from 'next/dynamic';
import PetsIcon from '@mui/icons-material/Pets';
import { Api } from '../../services/api';
import { ResponsePostType } from '../../services/api/types';
import { useRouter } from 'next/router';
const EditorJS = dynamic(() => import('../Editor').then((m) => m.Editor), { ssr: false });

interface WriteFormProps {
  data?: ResponsePostType;
}

export const WriteForm: React.FC<WriteFormProps> = (props) => {
  const router = useRouter();
  const [title, setTitle] = React.useState(props.data?.title || '');
  const [paragraphs, setParagraphs] = React.useState(props.data?.text || []);
  const [isLoading, setLoading] = React.useState(false);

  const clickOnSend = async () => {
    try {
      setLoading(true);
      if (props.data) {
        await Api().postAPI.updatePost(props.data.id, {
          title: title,
          text: paragraphs,
        });
        router.push(`/news/${props.data.id}`);
      } else {
        const newPost = await Api().postAPI.createPost({
          title: title,
          text: paragraphs,
        });
        router.push(`/news/${newPost.id}`);
      }
    } catch (err) {
      console.log(err);
      alert(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        classes={{ root: styles.titleField }}
        placeholder="Title"
      />
      <div className={styles.editor}>
        <EditorJS initialParagraphs={paragraphs} onChange={(blocks) => setParagraphs(blocks)} />
      </div>

      <Button
        onClick={clickOnSend}
        disabled={isLoading || !title.length || !paragraphs.length}
        variant="contained"
        style={{
          backgroundColor: '#9be1f3',
        }}
        endIcon={<PetsIcon />}>
        {props.data ? 'Save' : 'Send'}
      </Button>
    </div>
  );
};

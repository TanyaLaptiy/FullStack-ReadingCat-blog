import React from 'react';
import Link from 'next/link';
import { Paper, Typography } from '@material-ui/core';
import Image from 'next/image';

import styles from './Post.module.scss';
import { PostActions } from '../PostActions';

interface PostProps {
  id: number;
  title: string;
  secondTitle: string;
  imageUrl?: string;
}
export const Post: React.FC<PostProps> = (props) => {
  return (
    <Paper className="p-20" classes={{ root: styles.paper }} elevation={5}>
      <Typography style={{ wordWrap: 'break-word' }} variant="h5" className={styles.title}>
        <Link href={`/news/${props.id}`}>
          <a>{props.title}</a>
        </Link>
      </Typography>
      <Typography style={{ wordWrap: 'break-word' }} className="mt-10 mb-15">
        {props.secondTitle}
      </Typography>
      {props.imageUrl && (
        <Image
          src="https://leonardo.osnova.io/a21ca5a9-d95b-560d-9a6f-9fa87eff7fcd/-/preview/600/-/format/webp/"
          height={500}
          width={600}
          alt="image"
        />
      )}
      <PostActions />
    </Paper>
  );
};

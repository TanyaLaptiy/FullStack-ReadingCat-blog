import React from 'react';
import Link from 'next/link';
import { Button } from '@material-ui/core';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import MarkAsUnreadOutlinedIcon from '@mui/icons-material/MarkAsUnreadOutlined';
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';
import RecentActorsOutlinedIcon from '@mui/icons-material/RecentActorsOutlined';
import styles from './LeftMenu.module.scss';
import { useRouter } from 'next/router';
import { style } from '@mui/system';
const menu = [
  { text: 'Newsline', icon: <MenuBookOutlinedIcon />, path: '/' },
  { text: 'Messages', icon: <MarkAsUnreadOutlinedIcon />, path: '/messages' },
  { text: 'Rating', icon: <StarHalfOutlinedIcon />, path: '/rating' },
  { text: 'Subscriptions', icon: <RecentActorsOutlinedIcon />, path: '/follows' },
];

export const LeftMenu: React.FC = () => {
  const routerNext = useRouter();

  return (
    <div className={styles.menu}>
      <ul>
        {menu.map((obj) => {
          return (
            <li
              key={obj.path}
              className={`${
                routerNext.asPath === obj.path ? `${styles.active}` : `${styles.passive}`
              }`}>
              <Link href={obj.path}>
                <a>
                  <Button>
                    {obj.icon}
                    {obj.text}
                  </Button>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

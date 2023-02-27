import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Tabs,
  Tab,
} from '@material-ui/core';

import { MainLayout } from '../layouts/MainLayout';
import { FollowButton } from '../components/FollowButton';
import { Api } from '../services/api';
import { GetServerSideProps, NextPage } from 'next';
import { ResponseUserType } from '../services/api/types';

interface RatingPageProps {
  users: ResponseUserType[];
}
const Rating: NextPage<RatingPageProps> = (props) => {
  return (
    <MainLayout>
      <Paper className="pl-20 pt-20 pr-20 mb-20" elevation={5}>
        <Typography variant="h5" style={{ fontWeight: 'bold', fontSize: 30, marginBottom: 6 }}>
          Community and blog rating
        </Typography>
        <Typography style={{ fontSize: 15 }}>Top ten authors and commentators.</Typography>
        <Tabs
          className="mt-10"
          value={0}
          // indicatorColor="primary" textColor="primary"
        >
          <Tab label="Current month" />
          <Tab label="Last 3 months" />
          <Tab label="All the time" />
        </Tabs>
      </Paper>

      <Paper elevation={0}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  <span className="mr-15">{index + 1}</span>
                  {user.fullName}
                </TableCell>
                <TableCell align="right">{user.commentCount}</TableCell>
                <TableCell align="right">
                  <FollowButton />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const users = await Api().userAPI.getAllUsers();

    return { props: { users } };
  } catch (err) {
    console.log(err);
    return {
      props: { users: null },
    };
  }
};
export default Rating;

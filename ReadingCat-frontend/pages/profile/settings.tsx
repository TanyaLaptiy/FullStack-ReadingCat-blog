import { Button, Divider, Paper, TextField, Typography } from '@material-ui/core';
import { MainLayout } from '../../layouts/MainLayout';

export default function Settings() {
  return (
    <MainLayout hideComments>
      <Paper className="p-20" elevation={5}>
        <Typography variant="h6">Основные настройки</Typography>
        <Divider className="mt-20 mb-30" />
        <form>
          <TextField
            className="mb-20"
            size="small"
            label="Nickname"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            className="mb-20"
            size="small"
            label="Email"
            variant="outlined"
            fullWidth
            required
          />
          <TextField size="small" label="Password" variant="outlined" fullWidth required />
          <Divider className="mt-30 mb-20" />
          <Button style={{ backgroundColor: '#9be1f3' }} variant="contained">
            Save changes
          </Button>
        </form>
      </Paper>
    </MainLayout>
  );
}

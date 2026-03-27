
import NavbarAdmin from './NavbarAdmin';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

export const AdminPanel = () => {
  return (
   <>
      <NavbarAdmin />
      <Box > 
        <Outlet />
      </Box>
    </>
  );
}

export default AdminPanel;
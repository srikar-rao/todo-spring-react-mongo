import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import AppNavBar from './AppNavBar';
import AppFooter from './AppFooter';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppNavBar />

    <Box
      component="main"
      sx={{
        flex: 1,
        overflowY: 'scroll', // Changed to 'scroll' for overflow
        padding: '20px', // 20px padding around the main component
      }}
    >
      {children}
    </Box>

      <AppFooter />
    </Box>
  );
};

export default Layout;

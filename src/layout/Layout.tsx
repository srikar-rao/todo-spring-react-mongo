
import Container from '@mui/material/Container';
import type { ReactNode } from 'react';
import AppNavBar from './AppNavBar';

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <AppNavBar />
    <Container sx={{ mt: 4 }}>{children}</Container>
  </>
);

export default Layout;

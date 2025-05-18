import React from 'react';
import { Box, Typography } from '@mui/material';

const AppFooter: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                py: { xs: 1, sm: 2 }, // Adjust padding for small screens
                textAlign: 'center',
                mt: 'auto',
                fontSize: { xs: '0.75rem', sm: '1rem' }, // Adjust font size for small screens
            }}
        >
            <Typography variant="body2">
                © {new Date().getFullYear()} My Todo App. All rights reserved.
            </Typography>
        </Box>
    );
};

export default AppFooter;
import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { hasAnyRole, logout } from '../auth/keycloakService';
import { routes } from '../router/routes';


const AppNavBar: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Todo App
                </Typography>
                {routes
                    .filter((route) => {
                        if (route.roles) {
                          return hasAnyRole(route.roles);
                        }
                        return route.path !== '*';
                      })
                      .map((route) => (
                        <Button
                          key={route.path}
                          color="inherit"
                          component={Link}
                          to={route.path}
                        >
                          {route.label}
                        </Button>
                    ))}
                <Button color="inherit" onClick={logout}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
};

export default AppNavBar;
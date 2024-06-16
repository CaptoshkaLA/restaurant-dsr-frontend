import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/authSlice';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Restaurant DSR
        </Typography>
        <Button color="inherit" component={Link} to="/contacts">
          Contacts
        </Button>
        <Button color="inherit" component={Link} to="/menu">
          Menu
        </Button>
        <Button color="inherit" component={Link} to="/reserve">
          Reserve
        </Button>
        {token ? (
          <>
            <Button color="inherit" component={Link} to="/admin/dashboard">
              Admin Dashboard
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/admin/login">
            Admin
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

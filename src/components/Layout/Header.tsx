import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/authSlice';
import { ROUTES } from '../../constants';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to={ROUTES.HOME} sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Restaurant DSR
        </Typography>
        <Button color="inherit" component={Link} to={ROUTES.CONTACTS}>
          Contacts
        </Button>
        <Button color="inherit" component={Link} to={ROUTES.MENU}>
          Menu
        </Button>
        <Button color="inherit" component={Link} to={ROUTES.RESERVE}>
          Reserve
        </Button>
        {token ? (
          <>
            <Button color="inherit" component={Link} to={ROUTES.ADMIN_DASHBOARD}>
              Admin Dashboard
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to={ROUTES.ADMIN_LOGIN}>
            Admin
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

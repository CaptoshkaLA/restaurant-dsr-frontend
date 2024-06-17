import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/authSlice';
import { ROUTES } from '../../constants';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Contacts', route: ROUTES.CONTACTS },
    { text: 'Menu', route: ROUTES.MENU },
    { text: 'Reserve', route: ROUTES.RESERVE },
    ...(token ? [
      { text: 'Admin Dashboard', route: ROUTES.ADMIN_DASHBOARD },
      { text: 'Logout', action: handleLogout }
    ] : [
      { text: 'Admin', route: ROUTES.ADMIN_LOGIN }
    ])
  ];

  const renderMenuButtons = () => (
      <>
        {menuItems.map((item, index) => (
            item.route ? (
                <Button key={index} color="inherit" component={Link} to={item.route}>
                  {item.text}
                </Button>
            ) : (
                <Button key={index} color="inherit" onClick={item.action}>
                  {item.text}
                </Button>
            )
        ))}
      </>
  );

  const renderMenuList = () => (
      <List>
        {menuItems.map((item, index) => (
            <ListItem button key={index} component={item.route ? Link : 'div'} to={item.route} onClick={item.action}>
              <ListItemText primary={item.text} />
            </ListItem>
        ))}
      </List>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to={ROUTES.HOME} sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Restaurant DSR
        </Typography>
          <div className="desktop-menu">
            {renderMenuButtons()}
          </div>
          <div className="mobile-menu">
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              {renderMenuList()}
            </Drawer>
          </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

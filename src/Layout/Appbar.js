import React, {useState} from "react";
import {
  AppBar as Bar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  fade,
} from "@material-ui/core";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';

import Colors from '../Styles/Colors';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const StyledBar = styled(Bar)`
  display: flex;
  background-color: ${Colors.white};
  border-bottom: 1px solid ${Colors.transparentBlack};
  color: ${({ theme }) => theme.colors.text};
`;

const SearchInput = styled.div`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => fade(theme.colors.text, 0.1)};
  margin: 0 3rem;
  border-radius: ${({ theme }) => theme.roundness}px;
  align-items: center;
  transition: 300ms ease-in all;
  color: ${({ theme }) => theme.colors.text};
  @media (max-width: 900px) {
    margin: 0 1rem;
  }
`;

const Logo = styled(Typography)`
  font-family: inherit;
  font-weight: bold;
  text-transform: uppercase;
  margin: 0 1rem;
  color: ${Colors.black};
  @media (max-width: 750px) {
    display: none;
  }
`;

const Icon = styled.div`
  padding: 0 1rem;
  display: flex;
  align-content: center;
  justify-content: center;
`;

const Input = styled(InputBase)`
  font-family: inherit;
  width: 100%;
  color: inherit;
`;

const Container = styled(Toolbar)`
  display: flex;
  align-items: center;
  align-content: center;
`;

const AvatarStyled = styled(Avatar)`
  color: #FFF;
  background-color: ${Colors.secondaryDark};
`;

export default function AppBar({ toogleDrawer, title }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const openAccountMenu = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledBar position="static" elevation={0}>
      <Container>
        {/* Menu */}
        <IconButton
          onClick={toogleDrawer}
          edge="start"
          color="inherit"
          aria-label="open drawer"
        >
          <MenuIcon />
        </IconButton>
        {/* Title */}
        <Logo variant="h4" noWrap>
          {title}
        </Logo>
        {/* Serch */}
        <SearchInput>

        </SearchInput>
        {/* User */}
        <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        >
        <AvatarStyled></AvatarStyled>
        </IconButton>
        <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={openAccountMenu}
        onClose={handleClose}
        >
          <MenuItem onClick={() => null}>Profile</MenuItem>
          <MenuItem onClick={() => handleClose()}>Logout</MenuItem>
        </Menu>
        
      </Container>
    </StyledBar>
  );
}
import React, { useState } from "react";
import AppBar from "./Appbar";
import SideBar from "./Sidebar";
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';

const Root = styled.div`
  display: grid;
  grid-template-columns: ${({ isDrawerOpen }) =>
      isDrawerOpen ? "240px" : "0px"} 1fr;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  children: {
    padding: theme.spacing(2),
  },
}));

function MainLayout({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [title,setTitle] = useState("Pathogens in Food");
  const classes = useStyles();

  return (
    <Root isDrawerOpen={isDrawerOpen}>
      <SideBar setTitle={setTitle} isOpen={isDrawerOpen} />
      <main>
        <AppBar title={title} toogleDrawer={() => setIsDrawerOpen((state) => !state)} />
        <div className={classes.children}>
        {children}
        </div>
      </main>
    </Root>
  );
}

export default MainLayout;
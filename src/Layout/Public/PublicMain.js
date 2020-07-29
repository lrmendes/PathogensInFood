import React, { useState } from "react";
import AppBar from "./PublicAppbar";
import SideBar from "./PublicSidebar";
import styled from "styled-components";

const Root = styled.div`
  display: grid;
  grid-template-columns: ${({ isDrawerOpen }) =>
      isDrawerOpen ? "240px" : "0px"} 1fr;
`;

export default function PublicMain({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [title,setTitle] = useState("Pathogens in Food");

  return (
    <Root isDrawerOpen={isDrawerOpen}>
      <SideBar setTitle={setTitle} isOpen={isDrawerOpen} />
      <main>
        <AppBar title={title} toogleDrawer={() => setIsDrawerOpen((state) => !state)} />
        {children}
      </main>
    </Root>
  );
}
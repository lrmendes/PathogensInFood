import React from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
//import useStores from "../stores/useStores";
import { observer } from "mobx-react";
import MainLayout from "../Layout/Main";
import Dashboard from "../Pages/Dashboard";
import BacteriaNew from "../Pages/Bacteria/New";
import StudyNew from "../Pages/Study/New";
import BacteriaSearch from "../Pages/Bacteria/Search";

function PrivateRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <MainLayout>
            <Route path="/" exact component={Dashboard} />
            <Route path="/new/bacteria" exact component={BacteriaNew} />
            <Route path="bacteria/search" exact component={BacteriaSearch} />     
            <Route path="/new/study" exact component={StudyNew} />
        </MainLayout>
      </Switch>
    </BrowserRouter>
  );
}

export default observer(PrivateRoutes);
import React from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
//import useStores from "../stores/useStores";
import { observer } from "mobx-react";
import PublicMainLayout from "../Layout/Public/PublicMain";
import Dashboard from "../Pages/Dashboard";

function Routes() {

  return (
    <BrowserRouter>
      <Switch>
        <PublicMainLayout>
            <Route path="/" exact component={Dashboard} />


            
        </PublicMainLayout>
        {/*userID ? (
					<Route component={PrivateRoutes} />
				) : (
					<Redirect to="/login" />
                )*/}
      </Switch>
    </BrowserRouter>
  );
}

export default observer(Routes);
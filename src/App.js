import React from "react";
import Routes from "./Routes/Routes";
import PrivateRoutes from "./Routes/PrivateRoutes";
import { observer } from "mobx-react";
import useStores from "./Stores/useStore";

function App() {
  const { appStore } = useStores();
  console.log(appStore.getUser());
  return appStore.getUser().auth ? <PrivateRoutes /> : <Routes />
}

export default observer(App);
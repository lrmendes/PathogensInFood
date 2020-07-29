import { observable, action, runInAction } from "mobx";

/*import { v4 as uuid } from "uuid";
import Statistic from "../models/Statistic";
import { Post } from "../models/Post";
import Category from "../models/Category";
import Product from "../models/Product";
import Stock from "../models/Stock";
import Warehouse from "../models/Warehouse";
import Wine from "../models/Wine";
import Task from "../models/Task";
import api from "../services/api";*/

const appStore = observable({
  user: {
    auth: true,
    id: null,
    name: "",
  },

  statistics: [],
  feed: [],
});

appStore.getUser = action(() => {
  return {auth: appStore.user.auth, id: appStore.user.id, name: appStore.user.name};
});

export default appStore;
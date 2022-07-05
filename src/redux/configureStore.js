import { configureStore } from "@reduxjs/toolkit";

import mungSlice from "./modules/mungSlice";
import myPageSlice from "./modules/myPageSlice";
import postDetailSlice from "./modules/postDetailSlice";
import userInfoSlice from "./modules/userInfoSlice";

const store = configureStore({
  reducer: {
    myPageSlice,
    mungSlice,
    postDetailSlice,
    userInfoSlice,
  },
});

export default store;

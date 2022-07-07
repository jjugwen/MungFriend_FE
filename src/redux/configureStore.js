import { configureStore } from "@reduxjs/toolkit";

import mungSlice from "./modules/mungSlice";
import myPageSlice from "./modules/myPageSlice";
import postDetailSlice from "./modules/postDetailSlice";
import userInfoSlice from "./modules/userInfoSlice";
import applySlice from "./modules/applySlice";
import postSlice from "./modules/postSlice";
import matchingSlice from "./modules/matchingSlice";

const store = configureStore({
  reducer: {
    myPageSlice,
    mungSlice,
    postDetailSlice,
    userInfoSlice,
    applySlice,
    postSlice,
    matchingSlice,
  },
});

export default store;

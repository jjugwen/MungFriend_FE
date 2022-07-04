import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./modules/userSlice";
import mungSlice from "./modules/mungSlice";
import myPageSlice from "./modules/myPageSlice";
import postDetailSlice from "./modules/postDetailSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    myPageSlice,
    mungSlice,
    postDetailSlice,
  },
});

export default store;

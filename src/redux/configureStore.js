import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./modules/userSlice";
import mungSlice from "./modules/mungSlice";
import myPageSlice from "./modules/myPageSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    myPageSlice,
    mungSlice,
  },
});

export default store;

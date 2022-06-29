import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./modules/userSlice";
import myPageSlice from "./modules/myPageSlice";

const store = configureStore({
  reducer: {
    mypage: myPageSlice,
    user: userReducer,
  },
});

export default store;

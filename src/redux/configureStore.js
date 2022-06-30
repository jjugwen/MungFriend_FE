import { configureStore } from "@reduxjs/toolkit";
import mungSlice from "./modules/mungSlice";
import myPageSlice from "./modules/myPageSlice";

const store = configureStore({
  reducer: {
    myPageSlice,
    mungSlice
  },
});

export default store;

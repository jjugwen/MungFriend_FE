import { configureStore } from "@reduxjs/toolkit";

import myPageSlice from "./modules/myPageSlice";

const store = configureStore({
  reducer: {
    myPageSlice
  },
});

export default store;

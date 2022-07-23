import { configureStore } from "@reduxjs/toolkit";

import mungSlice from "./modules/mungSlice";
import myPageSlice from "./modules/myPageSlice";
import postDetailSlice from "./modules/postDetailSlice";
import userInfoSlice from "./modules/userInfoSlice";
import applySlice from "./modules/applySlice";
import postSlice from "./modules/postSlice";
import reviewSlice from "./modules/reviewSlice";

//chat
import channelSlice from "./modules/chat/channelSlice";
import chatSlice from "./modules/chat/chatSlice";

const store = configureStore({
  reducer: {
    myPageSlice,
    mungSlice,
    postDetailSlice,
    userInfoSlice,
    applySlice,
    postSlice,
    reviewSlice,
    chat: chatSlice,
    channel: channelSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

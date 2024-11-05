import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});
export default store;

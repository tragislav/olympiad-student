import { configureStore } from "@reduxjs/toolkit";

import main from "./main/reducer";

export const store = configureStore({
  reducer: {
    main,
  },
});

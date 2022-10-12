import { configureStore } from "@reduxjs/toolkit";

import main from "./main/reducer";
import processing from "./processing/reducer";

export const store = configureStore({
  reducer: {
    main,
    processing,
  },
});

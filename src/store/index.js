import { configureStore } from "@reduxjs/toolkit";

import main from "./main/reducer";
import processing from "./processing/reducer";
import info from "./info/reducer";

export const store = configureStore({
  reducer: {
    main,
    processing,
    info,
  },
});

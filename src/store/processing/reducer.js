import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  privacyPolicy: false,
  dataProcessing: false,
};

const processingReducer = createSlice({
  name: "processing",
  initialState,
  reducers: {
    setPrivacyPolicy: (state, action) => {
      state.privacyPolicy = action.payload;
    },
    setDataProcessing: (state, action) => {
      state.dataProcessing = action.payload;
    },
  },
});

export const { setPrivacyPolicy, setDataProcessing } =
  processingReducer.actions;

export default processingReducer.reducer;

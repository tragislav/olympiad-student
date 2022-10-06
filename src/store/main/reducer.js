import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
};

const mainReducer = createSlice({
  name: "main",
  initialState,
  reducers: {
    addToStore: (state, action) => {
      Object.keys(action.payload).forEach(function (prop) {
        state.info[prop] = action.payload[prop];
      });
    },
    addToState: (state) => {
      localStorage.removeItem("info");
      localStorage.getItem("info");
      localStorage.setItem("info", JSON.stringify(state.info));
      // Object.keys(action.payload).forEach(function (prop) {
      //   state.info[prop] = action.payload[prop];
      // });
    },
  },
});

export const { addToStore, addToState } = mainReducer.actions;

export default mainReducer.reducer;

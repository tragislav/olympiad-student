import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  educationalEstablishment: {},
  legalRepresentative: {
    passport: {},
    person: {},
  },
  mainAddress: {
    address: {},
  },
  passport: {},
  person: {},
  specialities: [],
  user: {},
};

const mainReducer = createSlice({
  name: "main",
  initialState,
  reducers: {
    addToStore: (state, action) => {
      Object.keys(action.payload).forEach(function (prop) {
        state[prop] = action.payload[prop];
      });
    },
    addSpecialty: (state, action) => {
      const { number, spec } = action.payload;
      state.specialities[number] = spec;
    },
    addToState: (state) => {
      localStorage.removeItem("info");
      localStorage.getItem("info");
      localStorage.setItem("info", JSON.stringify(state));
    },
  },
});

export const { addToStore, addToState, addSpecialty } = mainReducer.actions;

export default mainReducer.reducer;

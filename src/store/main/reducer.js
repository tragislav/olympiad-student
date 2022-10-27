import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import merge from "lodash/merge";

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
  userSDOS: [],
};

export const addSpecialty = createAsyncThunk(
  "main/addSpecialty",
  async (payload) => {
    return payload;
  }
);

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
    addEstablishment: (state, action) => {
      state.educationalEstablishment = action.payload;
    },
    addToState: (state) => {
      localStorage.removeItem("info");
      localStorage.getItem("info");
      localStorage.setItem("info", JSON.stringify(state));
    },
    updateStore: (state, action) => {
      state = merge(state, action.payload);
    },
    deleteSpecialty: (state) => {
      state.specialities.pop();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addSpecialty.fulfilled, (state, action) => {
      const { number, spec } = action.payload;
      state.specialities[number] = spec;
    });
  },
});

export const {
  addToStore,
  addToState,
  addEstablishment,
  updateStore,
  deleteSpecialty,
} = mainReducer.actions;

export default mainReducer.reducer;

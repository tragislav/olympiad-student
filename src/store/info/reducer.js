import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllSpecialties, getEducationEstablishments } from "../../api/info";
import {
  _transformSpecialty,
  _transformEducationEstablishments,
} from "../../helpers/transformResults";

const initialState = {
  specialties: null,
  educationalEstablishment: null,
  requestMethod: null,
  wait: true,
};

export const getSpecialties = createAsyncThunk(
  "info/getSpecialties",
  async () => {
    const response = await getAllSpecialties(
      sessionStorage.getItem("username"),
      sessionStorage.getItem("password")
    );
    return response.map(_transformSpecialty);
  }
);

export const getEstablishments = createAsyncThunk(
  "info/getEstablishments",
  async () => {
    let response = null;
    await getEducationEstablishments(
      sessionStorage.getItem("username"),
      sessionStorage.getItem("password")
    ).then((data) => (response = data.map(_transformEducationEstablishments)));
    return response;
  }
);

const infoReducer = createSlice({
  name: "info",
  initialState,
  reducers: {
    updateRequestMethod: (state, action) => {
      state.requestMethod = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSpecialties.fulfilled, (state, action) => {
      state.specialties = action.payload;
      state.wait = false;
    });
    builder.addCase(getEstablishments.fulfilled, (state, action) => {
      state.educationalEstablishment = action.payload;
      // state.wait = false;
    });
  },
});

export const { updateRequestMethod } = infoReducer.actions;

export default infoReducer.reducer;

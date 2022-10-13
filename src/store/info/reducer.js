import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllSpecialties } from "../../api/info";
import { _transformSpecialty } from "../../helpers/transformResults";

const initialState = {
  specialties: null,
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

const infoReducer = createSlice({
  name: "info",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSpecialties.fulfilled, (state, action) => {
      state.specialties = action.payload;
    });
  },
});

export const {} = infoReducer.actions;

export default infoReducer.reducer;
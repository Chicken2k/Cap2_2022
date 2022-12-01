import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import restaurantApi from "../../../../api/restaurantApi";

export const nhahangData = createAsyncThunk(
  "nhahangs/nhahangData",
  async () => {
    const restaurants = await restaurantApi.getAllRestaurants();
    console.log(restaurants);
    return restaurants;
  }
);
const nhahangSlice = createSlice({
  name: "nhahangs",
  initialState: {
    nhahangs: [],
    loading: true,
    error: "",
  },
  reducers: {
    addRestaurant: (state, action) => {
      restaurantApi.createRestaurant(action.payload);
    },
    updateRestaurant: (state, action) => {
      restaurantApi.updateRestaurant(action.payload);
    },
    deleteRestaurant: (state, action) => {
      restaurantApi.deleteRestaurant(action.payload);
    },
  },
  extraReducers: {
    [nhahangData.pending]: (state) => {
      state.loading = true;
    },
    [nhahangData.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.error;
    },
    [nhahangData.fulfilled]: (state, action) => {
      state.loading = false;
      state.nhahangs = action.payload;
    },
  },
});
const { reducer, actions } = nhahangSlice;
export const { createRestaurant, updateRestaurant, deleteRestaurant } = actions;
export default reducer;

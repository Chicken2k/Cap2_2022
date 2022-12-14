import cityApi from "../../../../api/cityApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const cityData = createAsyncThunk("cities/cityData", async () => {
  const cities = await cityApi.getAll();
  return cities;
});
console.log("quytest", cityData);
const City = createSlice({
  name: "cities",
  initialState: {
    city: [],
    loading: true,
    error: "",
  },
  reducers: {
    addcity: (state, action) => {
      cityApi.create(action.payload);
    },
    removecity: (state, action) => {
      cityApi.delete(action.payload);
    },
    updatecity: (state, action) => {
      cityApi.edit(action.payload);
    },
    getallcity: (state, action) => {
      cityApi.getAll();
    },
  },
  extraReducers: {
    [cityData.pending]: (state) => {
      state.loading = true;
    },
    [cityData.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.error;
    },
    [cityData.fulfilled]: (state, action) => {
      state.loading = false;
      state.city = action.payload;
    },
  },
});
const { reducer, actions } = City;
export const { addcity, removecity, updatecity, getallcity } = actions;

export default reducer;

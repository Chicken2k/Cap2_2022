import foodApi from "../../../../api/foodApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const foodData = createAsyncThunk("foods/foodData", async () => {
  const foods = await foodApi.getAll();
  return foods;
});
const Food = createSlice({
  name: "foods",
  initialState: {
    food: [],
    loading: true,
    error: "",
  },
  reducers: {
    addfood: (state, action) => {
      foodApi.create(action.payload);
    },
    removefood: (state, action) => {
      foodApi.deletefood(action.payload);
    },
    updatefood: (state, action) => {
      foodApi.editfood(action.payload);
    },
    getallfood: (state, action) => {
      foodApi.getAll();
    },
  },
  extraReducers: {
    [foodData.pending]: (state) => {
      state.loading = true;
    },
    [foodData.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.error;
    },
    [foodData.fulfilled]: (state, action) => {
      state.loading = false;
      state.food = action.payload;
    },
  },
});
const { reducer, actions } = Food;
export const { addfood, removefood, updatefood, getallfood } = actions;

export default reducer;

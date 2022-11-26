import restaurantApi from "../../../api/restaurantApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const restaurantData = createAsyncThunk('restaurants/restaurantData', async () => {
    const userId = localStorage.getItem('userId');
    const restaurants = await restaurantApi.getAll(userId);
    return restaurants;
}) 
const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState: {
        restaurants: [],
        loading: true,
        error: ''
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
        }
    },
    extraReducers: {
        [restaurantData.pending]: (state) => {
            state.loading = true;
        },
        [restaurantData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [restaurantData.fulfilled]: (state, action) => {
            state.loading = false;
            state.restaurants = action.payload;
        }
    }
})
const { reducer, actions } = restaurantsSlice;
export const { createRestaurant, updateRestaurant, deleteRestaurant } = actions;
export default reducer;
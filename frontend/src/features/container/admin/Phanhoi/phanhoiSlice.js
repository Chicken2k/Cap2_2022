import phanhoiApi from "../../../../api/phanhoiApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const phanhoiData = createAsyncThunk('phanhois/phanhoiData', async () => {
    const phanhoi = await phanhoiApi.getAll();
    return phanhoi;
})
const Phanhoi = createSlice({
    name: "phanhois",
    initialState: {
        phanhoi: [],
        loading: true,
        error: ''
    },
    reducers: {
        addphanhoi: (state, action) => {
            phanhoiApi.postphanhoi(action.payload);
        },
        removephanhoi: (state, action) => {
            phanhoiApi.deletephanhoi(action.payload);
        },
        updatephanhoi: (state, action) => {
            phanhoiApi.editphanhoi(action.payload);
        }
    },
    extraReducers: {
        [phanhoiData.pending]: (state) => {
            state.loading = true;
        },
        [phanhoiData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [phanhoiData.fulfilled]: (state, action) => {
            state.loading = false;
            state.phanhoi = action.payload;
        }
    }
});
const { reducer, actions } = Phanhoi;
export const { addphanhoi, removephanhoi, updatephanhoi } = actions;

export default reducer;

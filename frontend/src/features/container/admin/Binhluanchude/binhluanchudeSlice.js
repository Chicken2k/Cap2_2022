import binhluanchudeApi from "../../../../api/binhluanchudeApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const binhluanchudeData = createAsyncThunk('binhluanchudes/binhluanchudeData', async () =>{
    const binhluanchude = await  binhluanchudeApi.getAll();
    return binhluanchude;
})
const Binhluanchude = createSlice({
    name: "binhluanchudes",
    initialState: {
        binhluanchude: [],
        loading: true,
        error: ''
    },
    reducers: {
        addbinhluanchude: (state, action) => {
            binhluanchudeApi.postbinhluan(action.payload);
        },
        removebinhluanchude: (state, action) => {
            binhluanchudeApi.deletebinhluan(action.payload);
        },
        updatebinhluanchude: (state, action) => {
            binhluanchudeApi.editbinhluan(action.payload);
        },
        getallbinhluan: (state,action) => {
            binhluanchudeApi.getallbinhluan();
        }
    },
    extraReducers: {
        [binhluanchudeData.pending]: (state) => {
            state.loading = true;
        },
        [binhluanchudeData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [binhluanchudeData.fulfilled]: (state, action) => {
            state.loading = false;
            state.binhluanchude = action.payload;
        }
    }
});
const { reducer, actions } = Binhluanchude;
export const { addbinhluanchude, removebinhluanchude, updatebinhluanchude } = actions;

export default reducer;

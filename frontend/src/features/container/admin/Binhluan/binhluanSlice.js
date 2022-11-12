import binhluanApi from "../../../../api/binhluanApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const binhluanData = createAsyncThunk('binhluans/binhluanData', async () => {
    const binhluan = await binhluanApi.getAll();
    return binhluan;
})
const Binhluan = createSlice({
    name: "binhluans",
    initialState: {
        binhluan: [],
        loading: true,
        error: ''
    },
    reducers: {
        addbinhluan: (state, action) => {
            binhluanApi.postbinhluan(action.payload);
        },
        removebinhluan: (state, action) => {
            binhluanApi.deletebinhluan(action.payload);
        },
        updatebinhluan: (state, action) => {
            binhluanApi.editbinhluan(action.payload);
        },
        findbinhluan: (state, action) => {
            binhluanApi.getbinhluan(action.payload);
        },
        getallbinhluan: (state,action) => {
            binhluanApi.getallbinhluan();
        }
    },
    extraReducers: {
        [binhluanData.pending]: (state) => {
            state.loading = true;
        },
        [binhluanData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [binhluanData.fulfilled]: (state, action) => {
            state.loading = false;
            state.binhluan = action.payload;
        }
    }
});
const { reducer, actions } = Binhluan;
export const { addbinhluan, removebinhluan, updatebinhluan, findbinhluan, getallbinhluan } = actions;

export default reducer;

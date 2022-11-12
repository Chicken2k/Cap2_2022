import chudeApi from "../../../../api/chudeApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const chudeData = createAsyncThunk('chudes/chudeData', async () => {
    const chude = await chudeApi.getAll();
    return chude;
})
const Chude = createSlice({
    name: "chudes",
    initialState: {
        chude: [],
        loading: true,
        error: ''
    },
    reducers: {
        addchude: (state, action) => {
            chudeApi.postchude(action.payload);
        },
        removechude: (state, action) => {
            chudeApi.deletechude(action.payload);
        },
        updatechude: (state, action) => {
            chudeApi.editchude(action.payload);
        },
        getallchude: (state, action) => {
            chudeApi.getAll();
        }
    },
    extraReducers: {
        [chudeData.pending]: (state) => {
            state.loading = true;
        },
        [chudeData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [chudeData.fulfilled]: (state, action) => {
            state.loading = false;
            state.chude = action.payload;
        }
    }
});
const { reducer, actions } = Chude;
export const { addchude, removechude, updatechude, getallchude } = actions;

export default reducer;

import { API_STATE, type ApiState } from "@shared/api/const";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NftState = {
    names: string[];
    status: ApiState;
    error: string | null;
};

const initialState: NftState = {
    names: [],
    status: API_STATE.IDLE,
    error: null,
};

const nftSlice = createSlice({
    name: "nft",
    initialState,
    reducers: {
        loading(state) {
            state.status = API_STATE.LOADING;
            state.error = null;
        },
        success(state, action: PayloadAction<string[]>) {
            state.status = API_STATE.SUCCESS;
            state.names = action.payload;
        },
        failed(state, action: PayloadAction<string>) {
            state.status = API_STATE.ERROR;
            state.error = action.payload;
        },
    },
});

export const nftActions = nftSlice.actions;
export const nftReducer = nftSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    approvalURL: null, // Fixed typo
    isLoading: false,
    orderId: null
};

export const createNewOrder = createAsyncThunk(
    "shoppingOrder/createNewOrder", // Fixed asyncThunk name
    async (orderData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/user/order/create",
                orderData
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

const shoppingOrderSlice = createSlice({
    name: "shoppingOrder",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createNewOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createNewOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.approvalURL = action.payload.approvalURL; // Fixed typo
                state.orderId = action.payload.orderId;
            })
            .addCase(createNewOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.approvalURL = null;
                state.orderId = null;
                console.error("Order creation failed:", action.payload);
            });
    }
});

export default shoppingOrderSlice.reducer;

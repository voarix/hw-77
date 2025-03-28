import { IMessage } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { createMessage, fetchAllMessages } from "./messagesThunks.ts";
import { RootState } from "../../app/store.ts";

interface MessageState {
  items: IMessage[];
  fetchLoading: boolean;
  createLoading: boolean;
  error: boolean;
}

const initialState: MessageState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
  error: false,
};

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMessages.pending, (state) => {
        state.fetchLoading = true;
        state.error = false;
      })
      .addCase(fetchAllMessages.fulfilled, (state, {payload: products}) => {
        state.items = products;
        state.fetchLoading = false;
      })
      .addCase(fetchAllMessages.rejected, (state) => {
        state.fetchLoading = true;
      })

      .addCase(createMessage.pending, (state) => {
        state.createLoading = true;
        state.error = false;
      })
      .addCase(createMessage.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createMessage.rejected, (state) => {
        state.createLoading = false;
        state.error = true;
      });
  }
});

export const messagesReducer = messageSlice.reducer;

export const selectMessages = (state: RootState) => state.messages.items;
export const selectMessagesLoading = (state: RootState) => state.messages.fetchLoading;
export const selectError = (state: RootState) => state.messages.error;

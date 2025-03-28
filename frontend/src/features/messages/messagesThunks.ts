import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMessage } from "../../types";
import axiosAPI from "../../axiosApi.ts";

export const fetchAllMessages = createAsyncThunk<IMessage[], void>(
  'products/fetchAllProducts',
  async () => {
    const response = await axiosAPI.get<IMessage[]>('/messages');
    return response.data;
  }
);
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMessage, IMessageMutation } from "../../types";
import axiosAPI from "../../axiosApi.ts";

export const fetchAllMessages = createAsyncThunk<IMessage[], void>(
  'products/fetchAllProducts',
  async () => {
    const response = await axiosAPI.get<IMessage[]>('/messages');
    return response.data;
  }
);

export const createMessage = createAsyncThunk<void, IMessageMutation>(
  'messages/createMessage',
  async (messageData) => {
    const formData = new FormData();

    formData.append('author', messageData.author);
    formData.append('description', messageData.description);
    if (messageData.image) {
      formData.append('image', messageData.image);
    }

    await axiosAPI.post('/messages', formData);
  }
);
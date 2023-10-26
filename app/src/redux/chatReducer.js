import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  chatId: null,
  chats: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMsg: "",
};

export const startChat = createAsyncThunk(
  "/start-chat",
  async (userInfo, thunkAPI) => {
    try {
      const { token } = userInfo;
      const res = await axios.post(
        "http://localhost:4000/start-chat",
        userInfo,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("start a chat  Response ", res);
      if (res.data) {
        return res.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errorMsg);
    }
  }
);

const chatReducer = createSlice({
  name: "chat",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = false;
      state.errorMsg = "";
    },
  },
  extraReducers: (builder) => {},
});

export const { reset } = chatReducer.actions;
export default chatReducer.reducer;

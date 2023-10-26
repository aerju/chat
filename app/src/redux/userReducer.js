import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMsg: "",
};

export const signup = createAsyncThunk("/signup", async (values, thunkAPI) => {
  try {
    const res = await axios.post("http://localhost:4000/signup", values);
    if (res.data) {
      localStorage.setItem("user", JSON.stringify(res.data));
      return res.data;
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errorMsg);
  }
});

export const login = createAsyncThunk("/login", async (values, thunkAPI) => {
  try {
    const res = await axios.post("http://localhost:4000/login", values);
    console.log("Login Response ", res);

    if (res.data) {
      localStorage.setItem("user", JSON.stringify(res.data));
      return res.data;
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errorMsg);
  }
});

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = false;
      state.errorMsg = "";
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        console.log("This is action", action);
        state.isLoading = false;
        state.isError = true;
        state.errorMsg = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        console.log("This is action", action);
        state.isLoading = false;
        state.isError = true;
        state.errorMsg = action.payload;
      });
  },
});

export const { reset ,logout} = userReducer.actions;
export default userReducer.reducer;

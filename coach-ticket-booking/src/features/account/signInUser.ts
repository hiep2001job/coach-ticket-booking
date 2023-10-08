import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import agent from "../../app/api/agent";
import { notification } from "antd";


export const signInUser = createAsyncThunk<User, any>(
  "account/signInUser",
  async (data, thunkApi) => {
    try {
      const userDto = await agent.Account.login(data);
      const { ...user } = userDto;

      localStorage.setItem("user", JSON.stringify(user));
      
      return user;
    } catch (error: any) {

      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

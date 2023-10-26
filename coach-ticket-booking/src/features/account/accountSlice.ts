import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User, UserDetail } from "../../app/models/user";

import agent from "../../app/api/agent";
import { history } from "../..";
import { notification } from "antd";

interface AccountState {
  user: User | null;
  userDetail: UserDetail | null;
}

const initialState: AccountState = {
  user: null,
  userDetail: null,
};

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

export const fetchCurrentUser = createAsyncThunk<UserDetail>(
  "account/fetchCurrentUser",
  async (_, thunkApi) => {
    thunkApi.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
    try {
      const userDetail: UserDetail = await agent.Account.currentUser();
      return userDetail;
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      history.push("/");
    },
    setUser: (state, action) => {
      let claims = JSON.parse(atob(action.payload.token.split(".")[1]));
      let roles =
        claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      state.user = {
        ...action.payload,
        roles: typeof roles === "string" ? [roles] : roles,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.userDetail = action.payload;
    });
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.userDetail = null;
      state.user = null;
      localStorage.removeItem("user");
      notification.error({ message: "Lỗi xác thực" });
      history.push("/");
    });

    builder.addMatcher(isAnyOf(signInUser.fulfilled), (state, action) => {
      let claims = JSON.parse(atob(action.payload.token.split(".")[1]));
      let roles =
        claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      state.user = {
        ...action.payload,
        roles: typeof roles === "string" ? [roles] : roles,
      };
      history.push("/");
    });

    builder.addMatcher(
      isAnyOf(signInUser.rejected, fetchCurrentUser.rejected),
      (state, action) => {
        console.log(action);
      }
    );
  },
});

export const { signOut, setUser } = accountSlice.actions;

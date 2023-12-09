import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User, UserDetail } from "../../app/models/user";

import agent from "../../app/api/agent";
import { history } from "../..";
import { notification } from "antd";
import { ACCOUNT_STATUS } from "../../utils/constants";

interface AccountState {
  registedUserId: string | null;
  user: User | null;
  userDetail: UserDetail | null;
  status:string|null
}

const initialState: AccountState = {
  registedUserId: null,
  user: null,
  userDetail: null,
  status:null
}; 

export const signInUser = createAsyncThunk<User, any>(
  "account/signInUser",
  async (data, thunkApi) => {
    try {
      const userDto = await agent.Account.login(data);
      const { ...user } = userDto;
      localStorage.setItem("user", JSON.stringify(user));
      thunkApi.dispatch(fetchCurrentUser());
      return user;
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const registerUser = createAsyncThunk<any, any>(
  "account/registerUser",
  async (data, thunkApi) => {
    try {
      const result = await agent.Account.register(data);
      return result.userId;
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const updateUserInfo = createAsyncThunk<any, any>(
  "account/updateUserInfo",
  async (data, thunkApi) => {
    try {
      const userDetail:UserDetail = await agent.Account.updateUserInfo(data);
      return userDetail;
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
    //fet current user
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
    //update user info
    builder.addCase(updateUserInfo.pending, (state, action) => {    
      state.status=ACCOUNT_STATUS.PENDING_UPDATE_INFO
    });
    builder.addCase(updateUserInfo.fulfilled, (state, action) => {
      state.userDetail = action.payload;
      state.status=null
      notification.success({message:"Cập nhật thông tin thành công"});
    });
    builder.addCase(updateUserInfo.rejected, (state, action) => {
      state.userDetail = null;
      state.user = null;
      state.status=null
      localStorage.removeItem("user");
      notification.error({ message: "Lỗi xác thực" });
      history.push("/");
    });

    //register
    builder.addCase(registerUser.pending, (state, action) => {
      state.status = ACCOUNT_STATUS.PENDING_RESGITER;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.registedUserId = action.payload;
      state.status = null;

    });
    builder.addCase(registerUser.rejected, (state, action:any) => {
      notification.error({ message: action.payload });
      state.status = null;
      history.push("/");
    });

    //Login
    builder.addCase(signInUser.pending, (state, action) => {
      state.status = ACCOUNT_STATUS.PENDING_LOGIN;
    });
    builder.addCase(signInUser.fulfilled, (state, action,) => {
      let claims = JSON.parse(atob(action.payload.token.split(".")[1]));
      let roles =
        claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      state.user = {
        ...action.payload,
        roles: typeof roles === "string" ? [roles] : roles,
      };
      state.status = null;
      history.push("/");
    });

    builder.addMatcher(
      isAnyOf(signInUser.rejected, fetchCurrentUser.rejected),
      (state, action) => {
        state.status = null;
        console.log(action);
      }
    );
  },
});

export const { signOut, setUser } = accountSlice.actions;

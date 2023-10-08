import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";

import agent from "../../app/api/agent";
import { history } from "../..";
import { signInUser } from "./signInUser";



interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: null,
};

export const fetchCurrentUser = createAsyncThunk<User>(
  "account/fetchCurrentUser",
  async (_, thunkApi) => {
    thunkApi.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
    try {
      const userDto = await agent.Account.currentUser();
      const { basket, ...user } = userDto;
  
      localStorage.setItem("user", JSON.stringify(user));
      return user;
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
          claims[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        state.user = {
          ...action.payload,
          roles: typeof roles === "string" ? [roles] : roles,
        };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.rejected, (state,action) => {
      // state.user = null;
      // localStorage.removeItem("user");
      // toast.error("Session expired please login again");
      // history.push("/");
      console.log(action.payload)
    });

    // builder.addMatcher(
    //   isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),
    //   (state, action) => {
    //     let claims = JSON.parse(atob(action.payload.token.split(".")[1]));
    //     let roles =
    //       claims[
    //         "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    //       ];
    //     state.user = {
    //       ...action.payload,
    //       roles: typeof roles === "string" ? [roles] : roles,
    //     };
    //   }
    // );
builder.addCase(signInUser.fulfilled,(stat))

    builder.addMatcher(
      isAnyOf(signInUser.rejected, fetchCurrentUser.rejected),
      (state, action) => {
        console.log(action);
      }
    );
  },
});

export const { signOut, setUser } = accountSlice.actions;

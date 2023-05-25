import { UserInfo } from "@/api/user/user.types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserInfoState {
  userInfo: UserInfo;
}

const defaultUserInfo = {
  userId: "",
  username: "",
  nickname: "",
};

const initialState: UserInfoState = {
  userInfo: { ...defaultUserInfo },
};
export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUserInfo(state: UserInfoState, data: PayloadAction<UserInfo>) {
      state.userInfo = data.payload;
    },
    clearUserInfo(state: UserInfoState) {
      state.userInfo = { ...defaultUserInfo };
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;

export default userSlice.reducer;

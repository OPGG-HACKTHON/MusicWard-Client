import { atom, selector } from "recoil";
import { localStorageEffect } from "utils/hooks/localStorageEffect";

export type TokenType = {
  accessToken?: string;
  refreshToken?: string;
  oauthRefreshToken?: string;
  type?: "GOOGLE" | "SPOTIFY";
};

export type AuthType = {
  id?: string;
  token?: string;
  name?: string;
  email?: string;
};

export const token = atom<TokenType>({
  key: "token",
  default: {
    accessToken: undefined,
    refreshToken: undefined,
    oauthRefreshToken: undefined,
    type: undefined,
  },
  effects_UNSTABLE: [localStorageEffect("musicward_token")],
});

export const auth = atom<AuthType>({
  key: "auth",
  default: {
    id: undefined,
    token: undefined,
    name: undefined,
    email: undefined,
  },
});

export const isLogined = selector({
  key: "isLogined",
  get: ({ get }) => {
    return !!get(token).accessToken;
  },
});

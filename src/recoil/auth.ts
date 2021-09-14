import { atom, selector } from "recoil";
import { localStorageEffect } from "utils/hooks/localStorageEffect";

export type TokenType = {
  accessToken?: string;
  refreshToken?: string;
  oauthRefreshToken?: string;
  type?: "GOOGLE" | "SPOTIFY";
};

export type AuthType = {
  name?: string;
  nickname?: string;
  googleEmail?: string;
  spotifyEmail?: string;
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
    name: undefined,
    nickname: undefined,
    googleEmail: undefined,
    spotifyEmail: undefined,
  },
  effects_UNSTABLE: [localStorageEffect("musicward_auth")],
});

export const isLogined = selector({
  key: "isLogined",
  get: ({ get }) => {
    return !!get(token).accessToken;
  },
});

export const accessToken = selector({
  key: "accessToken",
  get: ({ get }) => {
    return get(token).accessToken;
  },
});

export const refreshToken = selector({
  key: "refreshToken",
  get: ({ get }) => {
    return get(token).refreshToken;
  },
});

export const isSpotify = selector({
  key: "isSpotify",
  get: ({ get }) => {
    return !!get(auth).spotifyEmail;
  },
});

export const getAuth = selector({
  key: "getAuth",
  get: ({ get }) => {
    return get(auth);
  },
});

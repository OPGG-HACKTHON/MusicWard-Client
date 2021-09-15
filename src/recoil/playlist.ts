import { atom } from "recoil";

export const playlistIdState = atom<number>({
  key: "playlistIdState",
  default: 1,
});

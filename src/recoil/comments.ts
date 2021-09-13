import { atom } from "recoil";

export const uploadCommentState = atom<boolean>({
  key: "uploadCommentState",
  default: false,
});

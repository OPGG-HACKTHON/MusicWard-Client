import { atom } from "recoil";

export const modalState = atom<boolean>({
  key: "modalState",
  default: false,
});

export const reportModalState = atom<boolean>({
  key: "reportModalState",
  default: false,
});

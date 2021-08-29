import { atom, selector } from "recoil";

export interface authType {
  id: string;
  token: string;
  name: string;
  email: string;
}

export const auth = atom<authType>({
  key: "auth",
  default: {
    id: "",
    token: "",
    name: "",
    email: "",
  },
});

export const isLogined = selector({
  key: "isLogined",
  get: ({ get }) => {
    return !!get(auth).token;
  },
});

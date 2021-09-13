import { atom, selector } from "recoil";

export type AlertType = {
  show?: boolean;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
};

export const alertState = atom<AlertType>({
  key: "alertState",
  default: {
    show: false,
    title: undefined,
    confirmText: undefined,
    cancelText: undefined,
    onConfirm: undefined,
  },
});

export const getAlertState = selector({
  key: "getAlertState",
  get: ({ get }) => {
    return get(alertState);
  },
});

import { useCallback, useState, useEffect, MutableRefObject } from "react";

import { Option } from "./Dropdown";

interface DropdownInteractionProps {
  options: Option[];
  node: MutableRefObject<HTMLDivElement | null>;
  disabled?: boolean;
  onChange: (v: string) => void;
}

const useDropdownInteraction = ({
  disabled,
  node,
  onChange,
}: DropdownInteractionProps) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleToggleDropdown = useCallback(() => {
    if (!disabled) {
      setIsOpened(!isOpened);
    }
  }, [disabled, isOpened, setIsOpened]);

  const handleClickOutsideDropdown = useCallback(
    (e) => {
      if (node.current && node.current.contains(e.target)) {
        return;
      }
      setIsOpened(false);
    },
    [node]
  );

  const handleChange = useCallback(
    (v: string) => {
      onChange?.(v);
      setIsOpened(false);
    },
    [onChange]
  );

  useEffect(() => {
    if (node && node.current) {
      window.addEventListener("mousedown", handleClickOutsideDropdown, false);

      return () => {
        window.removeEventListener(
          "mousedown",
          handleClickOutsideDropdown,
          false
        );
      };
    }
  }, [node, handleClickOutsideDropdown]);

  useEffect(() => {
    if (disabled && isOpened) {
      setIsOpened(false);
    }
  }, [disabled, isOpened, setIsOpened]);

  return {
    isOpened,
    handleChange,
    handleToggleDropdown,
  };
};

export default useDropdownInteraction;

import React, { FC, useRef } from "react";
import styled from "styled-components";

import DropdownOptionContainer from "./DropdownOptionContainer";
import DropdownSelectedSection from "./DropdownSelectedSection";
import useDropdownInteraction from "./useDropdownInteraction";

export type Option = {
  key: string;
  label: string;
  value: string;
};

export interface DropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  isSmall?: boolean;
}

const Dropdown: FC<DropdownProps> = ({ value, options, onChange, isSmall }) => {
  const ref = useRef(null);

  const { isOpened, handleChange, handleToggleDropdown } =
    useDropdownInteraction({ options, node: ref, onChange });

  return (
    <DropdownWrapper isSmall={isSmall}>
      <DropdownContainer
        isSmall={isSmall}
        ref={ref}
        tabIndex={0}
        onClick={handleToggleDropdown}
      >
        <DropdownSelectedSection
          isSmall={isSmall}
          onClick={handleToggleDropdown}
          value={value}
        />
        {isOpened && (
          <DropdownOptionContainer
            isSmall={isSmall}
            value={value}
            options={options}
            onChange={handleChange}
          />
        )}
      </DropdownContainer>
    </DropdownWrapper>
  );
};

export default Dropdown;

const DropdownWrapper = styled.div<{ isSmall?: boolean }>`
  display: inline-block;
  position: relative;
  width: ${({ isSmall }) => (isSmall ? "157px" : "198px")};
  cursor: pointer;
`;

const DropdownContainer = styled.div<{ isSmall?: boolean }>`
  height: ${({ isSmall }) => (isSmall ? "21px" : "27px")};
  font-size: 16px;
  padding: 10px 21px 10px 30px;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  background-color: #2c2c2c;
  border-top: 2px solid #9b8a61;
  border-left: 2px solid #9b8a61;
  border-bottom: 2px solid #9b8a61;
  outline: none;
  align-items: center;
  display: flex;
`;

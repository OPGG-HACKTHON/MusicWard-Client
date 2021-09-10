import React, { FC, useCallback } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import styled from "styled-components";

import { Option } from "./Dropdown";

interface DropdownOptionContainerProps {
  value?: string;
  options: Option[];
  useFilter?: boolean;
  onChange: (v: string) => void;
  onFilterChange?: (value: string) => void;
  isSmall?: boolean;
}

const DropdownOptionContainer: FC<DropdownOptionContainerProps> = ({
  options,
  onChange,
  isSmall,
}) => {
  const handleOptionSelect = useCallback(
    (option: Option) => () => {
      onChange(option.value);
    },
    [onChange]
  );

  return (
    <OptionContainer isSmall={isSmall}>
      <StyledScrollbar useFilter>
        {options.map((option) => (
          <StyledDiv
            isSmall={isSmall}
            tabIndex={0}
            onClick={handleOptionSelect(option)}
            key={option.key}
          >
            {option.label}
          </StyledDiv>
        ))}
      </StyledScrollbar>
    </OptionContainer>
  );
};

export default DropdownOptionContainer;

const StyledScrollbar = styled(PerfectScrollbar)<{ useFilter: boolean }>`
  position: relative;
  max-height: ${({ useFilter }) => (useFilter ? "306px" : "346px")};
`;

const OptionContainer = styled.div<{ isSmall?: boolean }>`
  position: absolute;
  top: ${({ isSmall }) => (isSmall ? "43px" : "49px")};
  background-color: #2c2c2c;
  z-index: 100;
  width: ${({ isSmall }) => (isSmall ? "155px" : "196px")};
  left: 2px;
`;

const StyledDiv = styled.div<{ isSmall?: boolean }>`
  height: 34px;
  font-size: ${({ isSmall }) => (isSmall ? "14px" : "16px")};
  padding: 8px 30px;
  outline: none;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
  color: rgba(244, 236, 217, 0.53);
  border-top: 1px solid rgb(201 172 106 / 20%);
  display: flex;
  align-items: center;
  cursor: pointer;
`;

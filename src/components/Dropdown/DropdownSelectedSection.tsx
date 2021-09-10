import React, { FC } from "react";
import styled from "styled-components";
import SelectArrow from "assets/icon/i-select.svg";

interface DropdownSelectedSectionProps {
  value?: string;
  onClick: () => void;
  isSmall?: boolean;
}

const DropdownSelectedSection: FC<DropdownSelectedSectionProps> = ({
  value,
  onClick,
  isSmall,
}) => {
  return (
    <SectionWrapper onClick={onClick} isSmall={isSmall}>
      <StyledLabel>{value}</StyledLabel>
      <StyledIcon />
    </SectionWrapper>
  );
};

export default DropdownSelectedSection;

const SectionWrapper = styled.div<{ isSmall?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-style: normal;
  font-weight: 500;
  font-size: ${({ isSmall }) => (isSmall ? "14px" : "16px")};
  line-height: 23px;
  color: rgba(244, 236, 217, 0.53);
  width: 100%;
`;

const StyledLabel = styled.label`
  text-overflow: clip;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
`;

const StyledIcon = styled.div`
  width: 5px;
  height: 15px;
  background-image: url(${SelectArrow});
  background-position: center;
`;

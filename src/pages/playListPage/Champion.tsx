import React, { useCallback } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { reportModalState } from "recoil/modal";

type IProps = {
  tags?: [];
};

const Champion = ({ tags }: IProps) => {
  const [, setOpenReportModal] = useRecoilState<boolean>(reportModalState);

  const handleOpenReportModal = useCallback(() => {
    setOpenReportModal(true);
  }, [setOpenReportModal]);

  return (
    <Container>
      <Tags>
        {tags?.map((tag: any) => (
          <TagButton key={0}>{`#${tag}`}</TagButton>
        ))}
      </Tags>

      <Functions>
        <FunctionButton onClick={handleOpenReportModal}>신고</FunctionButton>
        <FunctionButton>수정</FunctionButton>
      </Functions>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  margin: 35px auto 0;
  width: 1160px;
  height: 50px;
  overflow: visible;
`;

const Tags = styled.section`
  position: relative;
`;

const TagButton = styled.div`
  display: inline-block;
  padding: 7px 15px;
  margin: 6px;
  background: linear-gradient(#2c2c2c, #2c2c2c) padding-box,
    linear-gradient(180deg, #c9ac6a 0%, #72572a 100%) border-box;
  border: 1px solid transparent;
  border-radius: 19.5px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  color: #ffffff;
  opacity: 0.8;
`;

const Functions = styled.section`
  position: relative;
  top: 10px;
`;

const FunctionButton = styled.div`
  display: inline-block;
  padding: 5px 15px;
  margin: 4px;
  background: linear-gradient(#010407, #010407) padding-box,
    linear-gradient(180deg, #c9ac6a 0%, #72572a 100%);
  border: 1px solid transparent;
  border-radius: 8px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
  opacity: 0.8;
`;

export default Champion;

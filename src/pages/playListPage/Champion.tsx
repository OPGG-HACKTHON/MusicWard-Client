import React from "react";
import styled from "styled-components";

type IProps = {
  tags?: [];
};

const Champion = ({ tags }: IProps) => {
  console.log(tags, "태그출력");
  return (
    <Container>
      <Tags>
        {tags?.forEach((tag: any) => {
          console.log(tag);
          return <TagButton>{tag}</TagButton>;
        })}
        <TagButton>#가렌</TagButton>
        <TagButton>#데마시아</TagButton>
        <TagButton>#매드무비</TagButton>
      </Tags>

      <Functions>
        <FunctionButton>신고</FunctionButton>
        <FunctionButton>수정</FunctionButton>
      </Functions>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  margin: 5vw 5% 0 5%;
`;

const Tags = styled.section`
  position: relative;
  width: 30%;
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

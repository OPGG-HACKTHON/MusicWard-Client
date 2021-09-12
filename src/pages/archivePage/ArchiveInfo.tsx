import React, { useCallback, useState } from "react";
import styled from "styled-components";
import axiosInstance from "utils/axiosConfig";
import { useRecoilValue } from "recoil";
import { accessToken } from "recoil/auth";
import { useHistory } from "react-router-dom";

const ArchiveInfo = () => {
  const [title] = useState("데마시아의 힘을 느껴보자");
  const [description] = useState(`
    가렌은 불굴의 선봉대를 이끄는 고결하고 자긍심 강한 전사다. 
    선봉대 내에서 인망이 두터울 뿐 아니라 심지어 적에게도 존경을 받지만, 
    그가 대대로 데마시아와 데마시아의 이상을
    `);

  const jwtToken = useRecoilValue(accessToken);

  const functionBasicColor = "#010407";
  const functionActiveColor = "#2a4d6d";

  const [wardState, setWardState] = useState(true);
  const playlistId = 2;

  const handleWard = useCallback(
    (id, method) => async () => {
      const { data } = await axiosInstance({
        url: "playlists/ward",
        method: method,
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        data: {
          playlist_id: id,
        },
      });
      console.log(data);
    },
    []
  );

  const handleWardState = () => {
    if (wardState) {
      setWardState(false);
      handleWard(playlistId, "delete");
    } else {
      setWardState(true);
      handleWard(playlistId, "post");
    }
  };

  const history = useHistory();
  const goToDetail = () => {
    history.push({
      pathname: `/playlist/${playlistId}`,
    });
  };

  return (
    <Container>
      <Tags>
        <TagButton>#가렌</TagButton>
        <TagButton>#데마시아</TagButton>
        <TagButton>#매드무비</TagButton>
        <TagButton>#전사</TagButton>
        <TagButton>#가요</TagButton>
      </Tags>

      <PlayListInfo>
        <PlayListTitle>{title}</PlayListTitle>
        <PlayListHr />
        <PlayListDescription>{description}</PlayListDescription>
      </PlayListInfo>

      <Functions>
        <FunctionButton
          colorProps={wardState ? functionActiveColor : functionBasicColor}
          onClick={handleWardState}
        >
          와드
        </FunctionButton>
        <FunctionButton colorProps={functionBasicColor}>공유</FunctionButton>
        <FunctionButton colorProps={functionBasicColor} onClick={goToDetail}>
          상세
        </FunctionButton>
      </Functions>
    </Container>
  );
};

const Container = styled.section`
  width: 320px;
  margin: 142px 0 0;
  text-align: right;
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

const PlayListInfo = styled.section`
  position: relative;
  margin: 5vw 0;
`;

const PlayListTitle = styled.div`
  word-break: keep-all;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 41px;
  color: #ffffff;
`;

const PlayListHr = styled.hr`
  width: 100%;
  margin: 20px 0;
  opacity: 0.5;
  border: 1px solid #bb8c3c;
  transform: rotate(180deg);
  background-color: #bb8c3c;
`;

const PlayListDescription = styled.div`
  word-break: keep-all;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
`;

const Functions = styled.section`
  position: relative;
`;

const FunctionButton = styled.div<{ colorProps: string }>`
  display: inline-block;
  padding: 5px 15px;
  margin: 4px;
  background: linear-gradient(
        ${(props) => props.colorProps + ", " + props.colorProps}
      )
      padding-box,
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

export default ArchiveInfo;

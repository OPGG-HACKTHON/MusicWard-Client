import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import ReportModal from "components/ReportModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { accessToken, isLogined } from "recoil/auth";
import { modalState } from "recoil/modal";
import axiosInstance from "utils/axiosConfig";

type IProps = {
  tags?: [];
  playListId: number;
  wardState: boolean;
  setWardState: React.Dispatch<React.SetStateAction<boolean>>;
};

const Champion = ({ tags, playListId, wardState, setWardState }: IProps) => {
  const [modal, setModal] = useState<boolean>(false);
  const [, setOpenModal] = useRecoilState<boolean>(modalState);

  const handleOpenModal = useCallback(() => {
    wasLogined ? setModal(true) : setOpenModal(true);
  }, [setModal, setOpenModal]);

  const functionBasicColor = "#010407";
  const functionActiveColor = "#2a4d6d";

  const jwtToken = useRecoilValue(accessToken);
  const wasLogined = useRecoilValue(isLogined);

  const handleWard = async (method: any) => {
    await axiosInstance({
      url: "playlists/ward",
      method: method,
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      data: {
        playlist_id: playListId,
      },
    });
  };
  const handleWardState = () => {
    if (wasLogined) {
      if (wardState) {
        setWardState(false);
        handleWard("delete");
      } else {
        setWardState(true);
        handleWard("post");
      }
    } else {
      setOpenModal(true);
    }
  };

  const history = useHistory();
  const clickToSearch = (tag: string) => {
    history.push({
      pathname: "/search/list",
      search: `type=tag&text=${tag}`,
    });
  };

  return (
    <Container>
      <Tags>
        {tags?.map((tag: any, idx) => (
          <TagButton key={idx} onClick={() => clickToSearch(tag)}>
            {`#${tag}`}
          </TagButton>
        ))}
      </Tags>

      <Functions>
        <FunctionButton
          onClick={handleOpenModal}
          colorProps={functionBasicColor}
        >
          신고
        </FunctionButton>
        <FunctionButton
          onClick={handleWardState}
          colorProps={wardState ? functionActiveColor : functionBasicColor}
        >
          와드
        </FunctionButton>
      </Functions>

      {modal && <ReportModal setModal={setModal} />}
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
  cursor: pointer;
`;

const Functions = styled.section`
  position: relative;
  top: 10px;
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
  cursor: pointer;
`;

export default Champion;

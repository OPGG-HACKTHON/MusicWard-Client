import React, { FC, useCallback, useState } from "react";
import PlayListModalBg from "assets/img/playlist-modal.svg";
import styled from "styled-components";
import { CloseBtn, Wrapper } from "./LoginModal";
import axiosInstance from "utils/axiosConfig";
import { useRecoilValue } from "recoil";
import { accessToken } from "recoil/auth";

type InfoType = {
  title: string;
  description: string;
  champion: string;
};

interface PlayListAddModalProps {
  id: string;
  link: string;
  onClose: () => void;
}

const PlayListAddModal: FC<PlayListAddModalProps> = ({ onClose, id, link }) => {
  const jwtToken = useRecoilValue(accessToken);
  const [info, setInfo] = useState<InfoType>({
    title: "",
    description: "",
    champion: "",
  });
  // const [tagList, setTagList] = useState([]);
  const handleCreate = useCallback(async () => {
    console.log(info);
    const { data } = await axiosInstance({
      url: "playlists",
      method: "post",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      data: {
        original_id: id,
        provider: "YOUTUBE",
        title: info.title,
        description: info.description,
        champion_name: info.champion,
        tags: ["신남", "행복"], //tagList
      },
    });
    console.log(data);
    onClose?.();
  }, [onClose, info]);
  const handleChange = useCallback(
    (key) => () => {
      setInfo({
        ...info,
        [key]: "", //e.target.value,
      });
    },
    [info, setInfo]
  );
  return (
    <Wrapper>
      <ModalWrapper>
        <CloseBtn onClick={onClose} />
        <ModalContent>
          <Title>플레이리스트 생성</Title>
          <InputWrapper>
            <Label>링크</Label>
            <Input type="text" value={link} disabled />
          </InputWrapper>
          <InputWrapper>
            <Label>제목</Label>
            <Input type="text" onChange={handleChange("title")} />
          </InputWrapper>
          <InputWrapper>
            <Label>설명</Label>
            <Input type="text" onChange={handleChange("description")} />
          </InputWrapper>
          <InputWrapper>
            <Label>챔피언</Label>
            <Input type="text" onChange={handleChange("champion")} />
          </InputWrapper>
          <InputWrapper>
            <Label>태그</Label>
            <Input type="text" />
          </InputWrapper>
          <TagWrapper>
            <HintText>최대 5개 까지 가능합니다.</HintText>
          </TagWrapper>
          <Button type="button" onClick={handleCreate}>
            생성하기
          </Button>
        </ModalContent>
      </ModalWrapper>
    </Wrapper>
  );
};

export default PlayListAddModal;

const ModalWrapper = styled.div`
  position: absolute;
  left: calc(50% - 276px);
  top: calc(50% - 288px);
  background-image: url(${PlayListModalBg});
  background-repeat: no-repeat;
  width: 558px;
  height: 577px;
  background-position: center;
  background-size: contain;
`;

const ModalContent = styled.div`
  height: 520px;
  padding: 37px 65px 37px 50px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 28px;
  line-height: 41px;
  letter-spacing: -0.01em;
  margin-bottom: 43px;
  text-align: center;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const Label = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  color: #c9ac6a;
  opacity: 0.6;
`;

const Input = styled.input`
  width: 361px;
  height: 45px;
  border: 2px solid #9b8a61;
  box-shadow: none;
  color: #f4ecd987;
  font-size: 16px;
  padding-left: 25px;
  box-sizing: border-box;
  background-color: #12191c;
  border-radius: 3px;
`;

const TagWrapper = styled.div`
  margin-left: 82px;
  margin-top: 9px;
`;

const HintText = styled.div`
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.01em;
  color: #c9ac6a;
  opacity: 0.6;
`;

const Button = styled.button`
  width: 149px;
  height: 50px;
  border-radius: 39px;
  margin-bottom: 12px;
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
  background-color: #384a5b;
  border: none;
  margin: 0 auto;
  margin-top: 34px;
`;

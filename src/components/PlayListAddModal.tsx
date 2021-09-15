import React, { FC, useCallback, useState } from "react";
import PlayListModalBg from "assets/img/playlist-modal.svg";
import PlayListModalLongBg from "assets/img/playlist-modal-long.svg";
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
  provider: string;
  onClose: () => void;
}

const PlayListAddModal: FC<PlayListAddModalProps> = ({
  onClose,
  id,
  link,
  provider,
}) => {
  const jwtToken = useRecoilValue(accessToken);
  const [info, setInfo] = useState<InfoType>({
    title: "",
    description: "",
    champion: "",
  });
  const [tagList, setTagList] = useState<Array<string>>([]);
  const [tag, setTag] = useState<string>("");
  const [titleErrorMsg, setTitleErrorMsg] = useState("");
  const [championErrorMsg, setChampionErrorMsg] = useState("");
  const handleCreate = useCallback(async () => {
    await axiosInstance({
      url: "playlists",
      method: "post",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      data: {
        original_id: id,
        provider,
        title: info.title,
        description: info.description,
        champion_name: info.champion,
        tags: tagList,
      },
    })
      .then(() => {
        onClose?.();
      })
      .catch((err) => {
        if (err.response.status === 400) {
          if (info.title === "") {
            setTitleErrorMsg("제목은 필수 입력값입니다.");
          }
          if (info.champion === "") {
            setChampionErrorMsg("챔피언은 필수 입력값입니다.");
          }
        }
        if (err.response.status === 404) {
          setChampionErrorMsg("옳바른 챔피언명을 입력해주세요");
        }
      });
  }, [onClose, info, tagList]);
  const handleChange = useCallback(
    (key) => (e: { target: { value: string } }) => {
      setInfo({
        ...info,
        [key]: e.target.value,
      });
    },
    [info, setInfo]
  );
  const handleChangeTag = useCallback((e) => {
    setTag(e.target.value);
  }, []);
  const handleAddTag = useCallback(
    (e) => {
      if (e.key === "Enter") {
        if (tagList.length > 4) {
          return;
        }
        setTagList([...tagList, tag]);
        setTag("");
      }
    },
    [tag, setTagList, setTag]
  );
  return (
    <Wrapper>
      <ModalWrapper long={tagList.length > 0}>
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
          <ErrorMsg>{titleErrorMsg}</ErrorMsg>
          <InputWrapper>
            <Label>설명</Label>
            <Input type="text" onChange={handleChange("description")} />
          </InputWrapper>
          <InputWrapper>
            <Label>챔피언</Label>
            <Input type="text" onChange={handleChange("champion")} />
          </InputWrapper>
          <ErrorMsg>{championErrorMsg}</ErrorMsg>
          <InputWrapper>
            <Label>태그</Label>
            <Input
              type="text"
              value={tag}
              onChange={handleChangeTag}
              onKeyPress={handleAddTag}
            />
          </InputWrapper>
          <HintText>최대 5개 까지 가능합니다.</HintText>
          {tagList.length > 0 && (
            <TagWrapper>
              {tagList.map((i, index) => (
                <TagCloud key={index}>#{i}</TagCloud>
              ))}
            </TagWrapper>
          )}
          <Button type="button" onClick={handleCreate}>
            생성하기
          </Button>
        </ModalContent>
      </ModalWrapper>
    </Wrapper>
  );
};

export default PlayListAddModal;

const ModalWrapper = styled.div<{ long: boolean }>`
  position: absolute;
  left: calc(50% - 276px);
  top: calc(50% - 288px);
  background-image: ${({ long }) =>
    long ? `url(${PlayListModalLongBg})` : `url(${PlayListModalBg})`};
  background-repeat: no-repeat;
  width: 558px;
  height: ${({ long }) => (long ? "663px" : "577px")};
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

const HintText = styled.div`
  margin-left: 82px;
  margin-top: 9px;
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

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const TagCloud = styled.div`
  border-radius: 19.5px;
  padding: 7px 15px;
  background: linear-gradient(#2c2c2c, #2c2c3c) padding-box,
    linear-gradient(
      to top,
      rgba(201, 172, 106, 1) 0%,
      rgba(114, 87, 42, 1) 103%
    );
  border: 1px solid transparent;
  margin: 0 10px 10px 0;
`;

const ErrorMsg = styled.p`
  margin: 5px 0 0 82px;
  font-size: 13px;
  color: #b52d2d;
`;

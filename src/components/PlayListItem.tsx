import React, { FC, useCallback } from "react";
import styled from "styled-components";

import Ward from "assets/icon/i-ward.png";
import EmptyImg from "assets/img/empty-img.svg";
import { Icon } from "pages/mainPage/PlayList";

import { useHistory } from "react-router-dom";

export interface PlayListItemProps {
  id: number;
  title: string;
  listCount: number;
  wardCount: number;
  imgUrl?: string;
}

const PlayListItem: FC<PlayListItemProps> = ({
  id,
  title,
  listCount,
  wardCount,
  imgUrl,
}) => {
  const history = useHistory();
  const goPlayList = useCallback(() => {
    history.push({
      pathname: `/playlist/${id}`,
    });
  }, []);
  return (
    <SliderItem onClick={goPlayList}>
      <SliderItemBox imgUrl={imgUrl}>
        <SliderItemGradient>
          <ItemWrappder>
            <Title>{title}</Title>
            <CountWrapper>
              <Count>{listCount}곡</Count>
              <Divider />
              <Icon src={Ward} width={13} height={14} marginRight={2} />
              <Count>{wardCount}</Count>
            </CountWrapper>
          </ItemWrappder>
        </SliderItemGradient>
      </SliderItemBox>
    </SliderItem>
  );
};

export default PlayListItem;

const SliderItem = styled.div`
  position: relative;
  width: 200px !important;
  height: 200px;
  background: conic-gradient(
    #755c28,
    #d3bf89,
    #817347,
    #433915,
    #817347,
    #d3bf89,
    #755c28
  );
  padding: 12px;
  box-sizing: border-box;
  margin: 0 22px;
  cursor: pointer;
`;

const SliderItemBox = styled.div<{ imgUrl?: string }>`
  position: absolute;
  top: 5px;
  left: 5px;
  width: 190px;
  height: 190px;
  background: url(${({ imgUrl }) => imgUrl || EmptyImg}), #010407;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const SliderItemGradient = styled.div`
  position: absolute;
  height: 130px;
  width: 100%;
  bottom: 0;
  left: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 69.05%);
`;
const ItemWrappder = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  left: 15px;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;
const CountWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 7px;
`;
const Count = styled.div`
  font-size: 12px;
  font-weight: medium;
  opacity: 0.6;
`;
const Divider = styled.hr`
  height: 13px;
  width: 1px;
  background-color: #666666;
  opacity: 0.5;
  margin: 0 10px;
  border: 0;
`;

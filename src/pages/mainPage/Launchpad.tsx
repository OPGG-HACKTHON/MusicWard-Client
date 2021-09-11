import React, { FC, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import Fighters from "assets/icon/i-fighters.png";
import Assassins from "assets/icon/i-assassins.png";
import Mages from "assets/icon/i-mages.png";
import Marksmen from "assets/icon/i-marksmen.png";
import Supports from "assets/icon/i-supports.png";
import Tanks from "assets/icon/i-tanks.png";
import LaunchpadBg from "assets/img/launchpad-bg.svg";
import InputSearch from "assets/icon/i-search.svg";

import { Icon } from "./PlayList";
import { Champion } from "./Main";
import { useState } from "react";
import axiosInstance from "utils/axiosConfig";

type ChampionList = {
  champion_id: number;
  english_name: string;
  name: string;
  position: Array<string>;
  image_url: string;
  matrix: Array<number>;
};

type IconType = {
  position?: string;
  img?: string;
};

interface LaunchpadProps {
  selectedChampion: Champion;
  onChange: (id: number) => void;
}

const Launchpad: FC<LaunchpadProps> = ({ selectedChampion, onChange }) => {
  const IconArr: Array<IconType> = [
    { position: "Tank", img: Tanks },
    {
      position: "Fighter",
      img: Fighters,
    },
    { position: "Assassin", img: Assassins },
    { position: "Mage", img: Mages },
    { position: "Marksman", img: Marksmen },
    { position: "Support", img: Supports },
  ];
  const [championList, setChampionList] = useState<Array<ChampionList>>([]);
  const [selectedIcon, setSelectedIcon] = useState<IconType>();
  const [searchText, setSearchText] = useState<string>();
  const [position, setPosition] = useState<Array<number>>([0, 0]);
  const handleClickChampion =
    ({ champion_id, matrix }: ChampionList) =>
    () => {
      setPosition(matrix);
      onChange(Number(champion_id));
    };
  const getChampionList = async () => {
    const { data } = await axiosInstance({
      url: "championlist",
      params: {
        positions: selectedIcon?.position,
        champion_name: searchText,
      },
    });
    setPosition([]);
    let row = 1;
    const temp = data.champion_list.map((i: ChampionList, index: number) => {
      if (index === row * 8) {
        row += 1;
      }
      if (i.champion_id === selectedChampion.champion_id) {
        setPosition([row - 1, (index % 8) + 1]);
      }
      return {
        ...i,
        matrix: [row - 1, (index % 8) + 1],
      };
    });
    setChampionList(temp);
  };
  const handleClickCategory = useCallback(
    (icon: IconType) => async () => {
      if (icon.position === selectedIcon?.position) {
        setSelectedIcon(undefined);
        return;
      }
      setSelectedIcon(icon);
    },
    [selectedIcon, setSelectedIcon]
  );
  const handlePressSearch = useCallback(
    (e) => {
      if (e.key === "Enter") {
        getChampionList();
      }
    },
    [getChampionList]
  );
  const handleChangeSearch = useCallback(
    (e) => {
      setSearchText(e.target.value);
    },
    [setSearchText]
  );
  useEffect(() => {
    getChampionList();
  }, [selectedChampion, selectedIcon]);

  return (
    <LaunchpadSection>
      <HorizontalLine />
      <LaunchPadBg>
        <Description>
          <div>런치패드로</div>
          <div>챔피언의 플레이리스트를 확인해보세요.</div>
        </Description>
        <Launpad>
          <LaunpadInner>
            <LaunchpadFilter>
              <LeftFilter>
                {IconArr.map((i) => (
                  <FilterIcon
                    key={i.position}
                    src={i.img}
                    width={34}
                    height={34}
                    marginRight={10}
                    opacity={i.img === selectedIcon?.img ? 1 : 0.4}
                    onClick={handleClickCategory(i)}
                  />
                ))}
              </LeftFilter>
              <RightFilter>
                <Input
                  type="text"
                  placeholder="검색"
                  value={searchText}
                  onChange={handleChangeSearch}
                  onKeyPress={handlePressSearch}
                />
              </RightFilter>
            </LaunchpadFilter>
            <LaunchpadWrapper>
              {championList.map((i) => (
                <LaunchpadItem
                  key={i.champion_id}
                  position={
                    position[0] === i.matrix[0] || position[1] === i.matrix[1]
                  }
                  url={i.image_url}
                  selected={i.champion_id === selectedChampion.champion_id}
                  onClick={handleClickChampion(i)}
                />
              ))}
            </LaunchpadWrapper>
          </LaunpadInner>
        </Launpad>
      </LaunchPadBg>
    </LaunchpadSection>
  );
};

export default Launchpad;

const LaunchpadSection = styled.section`
  margin-top: 280px;
  position: relative;
`;

const HorizontalLine = styled.hr`
  position: absolute;
  width: 100%;
  height: 25px;
  top: 352px;
  left: 0;
  background-color: #285766;
  filter: blur(25px);
`;

const LaunchPadBg = styled.div`
  background-image: url(${LaunchpadBg});
  width: 1104px;
  height: 865px;
  background-repeat: no-repeat;
  background-size: contain;
  margin: 0 auto;
  position: relative;
  background-position-x: 13px;
`;
const Description = styled.div`
  position: absolute;
  left: 130px;
  top: -69px;
  color: #e7e8f1;
  opacity: 0.4;
`;

const Launpad = styled.div`
  width: 890px;
  height: 750px;
  background: conic-gradient(
    #755c28,
    #d3bf89,
    #817347,
    #433915,
    #817347,
    #d3bf89,
    #755c28
  );
  margin: 0 auto;
  border-radius: 20px;
  padding-top: 4px;
  box-sizing: border-box;
`;

const LaunpadInner = styled.div`
  width: 882px;
  height: 742px;
  background: conic-gradient(
    from 180deg at 50% 50%,
    #000203 0deg,
    #0e2135 51.73deg,
    #0a1826 88.44deg,
    #0e2135 135.74deg,
    #0b1b2b 180.1deg,
    #0e2135 225.74deg,
    #060f17 268.79deg,
    #0e2235 307.46deg,
    #000203 360deg
  );
  border-radius: 20px;
  margin: 0 auto;
  border-radius: 20px;
  padding: 20px 35px 60px 25px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const LaunchpadFilter = styled.div`
  min-height: 60px;
  width: calc(100% - 52px);
  border-bottom: 1px solid #64583a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 25px;
`;

const LeftFilter = styled.div`
  display: flex;
`;

const FilterIcon = styled(Icon)`
  cursor: pointer;
`;

const RightFilter = styled.div`
  input {
    margin-left: 10px;
  }
`;

const Input = styled.input`
  width: 153px;
  height: 30px;
  border: 2px solid #9b8a61;
  box-shadow: none;
  border-radius: 4px;
  color: #f4ecd987;
  font-size: 14px;
  padding-left: 25px;
  box-sizing: border-box;
  background: url(${InputSearch}) no-repeat left 8px center #12191c;
`;

const LaunchpadItem = styled.div<{
  url: string;
  selected: boolean;
  position?: boolean;
}>`
  width: 75px;
  height: 75px;
  cursor: pointer;
  background: radial-gradient(50% 50% at 50% 50%, #8488a0 0%, #40414f 100%);
  border-radius: 5px;
  border: 1px solid #73592c;
  background-image: url(${({ url }) => url});
  background-size: cover;
  background-repeat: no-repeat;
  background-size: 107%;
  background-position: center;
  margin: 11px;
  opacity: ${({ selected }) => (selected ? "1" : "0.2")};
  ${({ position, selected, url }) =>
    position &&
    !selected &&
    css`
      background-image: radial-gradient(
          50% 50% at 50% 50%,
          #ebf3ff80 0%,
          #444ea980 100%
        ),
        url(${url});
      border-radius: 6px;
      opacity: 0.5;
      border: 1px solid #0c1e2f;
    `}
  filter: ${({ selected }) =>
    selected ? "drop-shadow(0px 0px 12px #C89236)" : ""};

  &::after {
    width: 100px;
    height: 100px;
    background-color: white;
  }
  &::before {
    width: 100px;
    height: 100px;
    background-color: white;
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  margin-right: 10px;
`;

const LaunchpadWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  margin-left: -11px;
  padding: 0 0 0 25px;
  ${ItemWrapper}:last-child {
    margin-bottom: 0;
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: #36362d;
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #c9ac6a 0%, #72572a 100%);
    border: solid 1px #36362d;
  }
`;

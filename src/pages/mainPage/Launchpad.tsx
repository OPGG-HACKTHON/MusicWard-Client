import React from "react";
import styled from "styled-components";
import Fighters from "assets/img/i-fighters.png";
import Assassins from "assets/img/i-assassins.png";
import Mages from "assets/img/i-mages.png";
import Marksmen from "assets/img/i-marksmen.png";
import Supports from "assets/img/i-supports.png";
import Tanks from "assets/img/i-tanks.png";
import LaunchpadBg from "assets/img/launchpad-bg.png";
import SelectArrow from "assets/img/select-arrow.svg";
import InputSearch from "assets/img/input-search.svg";

import { Icon } from "./PlayList";

const Launchpad = () => {
  const IconArr = [Tanks, Fighters, Assassins, Mages, Marksmen, Supports];
  return (
    <LaunchpadSection>
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
                  <Icon
                    key={i}
                    src={i}
                    width={34}
                    height={34}
                    marginRight={10}
                    opacity={0.4}
                  />
                ))}
              </LeftFilter>
              <RightFilter>
                <Select value="이름순 정렬">
                  <option value="이름순 정렬">이름순 정렬</option>
                </Select>
                <Input type="text" placeholder="검색" />
              </RightFilter>
            </LaunchpadFilter>
            <LaunchpadWrapper>
              {[...Array(16)].map((w) => (
                <ItemWrapper key={w}>
                  {[...Array(8)].map((i) => (
                    <LaunchpadItem key={i}></LaunchpadItem>
                  ))}
                </ItemWrapper>
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
`;

const LaunchPadBg = styled.div`
  background-image: url(${LaunchpadBg});
  width: 1102px;
  height: 865px;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0 auto;
  position: relative;
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
    #0c1c2d,
    #0d1f32,
    #0e2235,
    #000204,
    #0e2235,
    #0d1f32,
    #0c1c2d
  );
  margin: 0 auto;
  border-radius: 20px;
  padding: 20px 35px 60px 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LaunchpadFilter = styled.div`
  height: 60px;
  width: calc(100% - 15px);
  border-bottom: 1px solid #64583a;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftFilter = styled.div`
  display: flex;
`;
const RightFilter = styled.div`
  input {
    margin-left: 10px;
  }
`;

const Select = styled.select`
  width: 115px;
  height: 30px;
  border: 2px solid #9b8a61;
  box-shadow: none;
  border-radius: 4px;
  color: #f4ecd987;
  font-size: 14px;
  padding-left: 10px;
  appearance: none;
  background: url(${SelectArrow}) no-repeat right 9px center #12191c;
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
  background: url(${InputSearch}) no-repeat right 9px center #12191c;
`;

const LaunchpadItem = styled.div`
  width: 75px;
  height: 75px;
  background: radial-gradient(50% 50% at 50% 50%, #8488a0 0%, #40414f 100%);
  border-radius: 5px;
  border: 1px solid #73592c;
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  margin-right: 10px;
`;

const LaunchpadWrapper = styled.div`
  height: 100%;
  overflow: auto;
  margin-top: 25px;
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

import React, { useState, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import queryString from "query-string";
import SelectArrow from "assets/img/select-arrow.svg";
import InputSearch from "assets/img/input-search.svg";
import SearchResultList from "./components/SearchResultList";
import { options } from "./Category";

const ResultList = () => {
  const history = useHistory();
  const { type, text } = queryString.parse(useLocation().search);
  const [list] = useState(
    [...Array(8)].map((i, index) => {
      return {
        title: `데마시아의 힘을 느껴보자${index}`,
        listCount: index,
        wardCount: index * 10,
        imgUrl:
          index % 2 === 0
            ? "https://i.ytimg.com/vi/veRIGU--tec/maxresdefault.jpg"
            : "https://i.scdn.co/image/ab67616d0000b2736fa6b0d2a6f7e50c4b45939f",
      };
    })
  );

  const [searchType, setSearchType] = useState(options[0].value);
  const [searchText, setSearchText] = useState("");
  const handleChangeSelect = useCallback(
    (e) => {
      setSearchType(e.target.value);
    },
    [setSearchType]
  );
  const handleChangeInput = useCallback(
    (e) => {
      setSearchText(e.target.value);
    },
    [setSearchText]
  );
  const search = useCallback(() => {
    history.replace({
      pathname: "/search/list",
      search: `type=${searchType}&text=${searchText}`,
    });
  }, [searchType, searchText]);
  const onCheckEnter = useCallback(
    (e) => {
      if (e.key === "Enter") {
        search();
      }
    },
    [search]
  );

  return (
    <Wrapper>
      <SearchWrapper>
        <SearchDescription>
          {options.filter((i) => i.value === type)[0].text}
          {type === "tag" ? "를" : "을"} 검색한 결과입니다.
        </SearchDescription>
        <SearchBar>
          <Select value={searchType} onChange={handleChangeSelect}>
            {options.map((i) => (
              <option key={i.value} value={i.value}>
                {i.text}
              </option>
            ))}
          </Select>
          <Input
            value={searchText}
            onChange={handleChangeInput}
            onKeyPress={onCheckEnter}
          />
        </SearchBar>
      </SearchWrapper>
      <SearchResultList
        title={
          <>
            <SearchText>{text}</SearchText> 검색하신 결과입니다!
          </>
        }
        subTitle={`${text} 검색하신 분들이 즐겨 듣는 플레이리스트에요!`}
        items={list}
      />
      <SearchResultList
        title={
          <>
            <SearchText>{text}</SearchText> 검색하신 결과입니다!
          </>
        }
        subTitle="인기 플레이리스트에요!"
        items={list}
      />
    </Wrapper>
  );
};

export default ResultList;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 22px;
  align-items: flex-start;
  margin-top: 44px;
  margin-bottom: 40px;
`;

const Wrapper = styled.div`
  width: 1220px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const SearchDescription = styled.div`
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.01em;
  color: #e7e8f1;
  opacity: 0.7;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
`;

const Select = styled.select`
  width: 159px;
  height: 45px;
  border: 2px solid #9b8a61;
  border-right: none;
  box-shadow: none;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  appearance: none;
  background: url(${SelectArrow}) no-repeat right 21px center #2c2c2c;
  background-size: 8px;
  padding-left: 21px;
  color: #f4ecd987;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
`;

const Input = styled.input`
  width: 297px;
  height: 45px;
  border: 2px solid #9b8a61;
  border-left: none;
  box-shadow: none;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  color: #f4ecd987;
  font-size: 16px;
  padding-left: 25px;
  box-sizing: border-box;
  background: url(${InputSearch}) no-repeat right 22px center #12191c;
  background-size: 15px;
`;

const SearchText = styled.span`
  font-weight: bold;
  font-size: 28px;
  line-height: 41px;
  letter-spacing: -0.01em;
`;

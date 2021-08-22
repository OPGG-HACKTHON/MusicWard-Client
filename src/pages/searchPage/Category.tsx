import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import SelectArrow from "assets/img/select-arrow.svg";
import InputSearch from "assets/img/input-search.svg";
import PlayListItem from "components/PlayListItem";

const options = [
  { value: "summoner", text: "소환사명" },
  { value: "tag", text: "태그" },
  { value: "champion", text: "챔피언명" },
  { value: "playlist", text: "플레이리스트명" },
];

const Category = () => {
  const history = useHistory();
  const [PlayList] = useState(
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
    history.push({
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
    <>
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
      <PlayListCategory>
        {PlayList.map((i, index) => (
          <PlayListItem
            key={`slider-item-${index}`}
            title={i.title}
            listCount={i.listCount}
            wardCount={i.wardCount}
            imgUrl={i.imgUrl}
          />
        ))}
      </PlayListCategory>
    </>
  );
};
export default Category;

const SearchBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 100px 0;
`;

const Select = styled.select`
  width: 200px;
  height: 51px;
  border: 2px solid #9b8a61;
  border-right: none;
  box-shadow: none;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  appearance: none;
  background: url(${SelectArrow}) no-repeat right 21px center #2c2c2c;
  background-size: 9px;
  padding-left: 30px;
  color: #f4ecd987;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
`;

const Input = styled.input`
  width: 480px;
  height: 51px;
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
  background-size: 18px;
`;

const PlayListCategory = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1000px;
  justify-content: center;
  margin: 0 auto;
  > div {
    margin-bottom: 50px;
  }
`;

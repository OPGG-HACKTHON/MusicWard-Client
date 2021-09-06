import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import SelectArrow from "assets/icon/i-select.svg";
import InputSearch from "assets/icon/i-search.svg";
import PlayListItem, { PlayListItemProps } from "components/PlayListItem";
import { useEffect } from "react";
import axiosInstance from "utils/axiosConfig";

export const options = [
  { value: "summoner", text: "소환사명" },
  { value: "tag", text: "태그" },
  { value: "champion", text: "챔피언명" },
  { value: "playlist", text: "플레이리스트명" },
];

const Category = () => {
  const history = useHistory();
  const [PlayList, setPlayList] = useState<Array<PlayListItemProps>>([]);
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
  const handleCheckEnter = useCallback(
    (e) => {
      if (e.key === "Enter") {
        search();
      }
    },
    [search]
  );
  const getRanking = async () => {
    const { data } = await axiosInstance({
      url: "ranking",
      params: {
        type: "playlist",
      },
    });
    setPlayList(
      data
        .splice(0, 8)
        .map(
          (i: { title: string; wards_total: string; image_url?: string }) => ({
            title: i.title,
            listCount: 10, // FIXME: api에 플레이리스트 곡수 포함시켜달라고 해야함
            wardCount: i.wards_total,
            imgUrl: i.image_url,
          })
        )
    );
  };
  useEffect(() => {
    getRanking();
  }, []);
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
          onKeyPress={handleCheckEnter}
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

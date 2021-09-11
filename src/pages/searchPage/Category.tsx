import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import InputSearch from "assets/icon/i-search.svg";
import PlayListItem, { PlayListItemProps } from "components/PlayListItem";
import { useEffect } from "react";
import axiosInstance from "utils/axiosConfig";
import Dropdown from "components/Dropdown";
import { Option } from "components/Dropdown";
import { RankType } from "pages/mainPage/Ranking";

export const options: Array<Option> = [
  { key: "summoner", value: "summoner", label: "소환사명" },
  { key: "tag", value: "tag", label: "태그" },
  { key: "champion", value: "champion", label: "챔피언명" },
  { key: "playlist", value: "playlist", label: "플레이리스트명" },
];

const Category = () => {
  const history = useHistory();
  const [PlayList, setPlayList] = useState<Array<PlayListItemProps>>([]);
  const [searchType, setSearchType] = useState<Option>(options[0]);
  const [searchText, setSearchText] = useState("");
  const handleChangeSelect = useCallback(
    (value) => {
      const [selected] = options.filter((i) => i.value === value);
      setSearchType(selected);
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
      search: `type=${searchType.value}&text=${searchText}`,
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
      data.splice(0, 8).map((i: RankType) => ({
        id: i.id,
        title: i.title,
        listCount: i.tracks_total,
        wardCount: i.wards_total,
        imgUrl: i.image_url,
      }))
    );
  };
  useEffect(() => {
    getRanking();
  }, []);
  return (
    <>
      <SearchBar>
        <Dropdown
          value={searchType.label}
          options={options}
          onChange={handleChangeSelect}
        />
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
            id={i.id}
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

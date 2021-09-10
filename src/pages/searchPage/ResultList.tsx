import React, { useState, useCallback, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import queryString from "query-string";
import SelectArrow from "assets/icon/i-select.svg";
import InputSearch from "assets/icon/i-search.svg";
import SearchResultList from "./components/SearchResultList";
import Dropdown, { Option } from "components/Dropdown";
import { options } from "./Category";
import axiosInstance from "utils/axiosConfig";
import { PlayListItemProps } from "components/PlayListItem";

const ResultList = () => {
  const history = useHistory();
  const { type, text } = queryString.parse(useLocation().search);
  const [listByRank, setListByRank] = useState([]);
  const [listByCreatedDate, setListByCreatedDate] = useState([]);
  const [rankList, setRankList] = useState<Array<PlayListItemProps>>([]);
  const [searchType, setSearchType] = useState<Option>(
    options.filter((i) => i.value === type)[0] || options[0]
  );
  const [searchText, setSearchText] = useState(text || "");
  console.log(type, text);
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
    history.replace({
      pathname: "/search/list",
      search: `type=${searchType.value}&text=${searchText}`,
    });
    getPlayListByRank();
    getPlayListByCreatedDate();
  }, [searchType, searchText]);
  const onCheckEnter = useCallback(
    (e) => {
      if (e.key === "Enter") {
        search();
      }
    },
    [search]
  );
  const getPlayListByRank = async () => {
    const { data } = await axiosInstance({
      url: `search/${searchType.value}`,
      params: {
        query: searchText,
        sort: "view",
        page: 1,
        size: 50,
      },
    });
    setListByRank(
      data.map(
        (i: {
          title: string;
          tracks: { total: number };
          wards: { total: number };
          image?: { url?: string };
        }) => ({
          title: i.title,
          listCount: i.tracks.total,
          wardCount: i.wards.total,
          imgUrl: i.image?.url,
        })
      )
    );
  };
  const getPlayListByCreatedDate = async () => {
    const { data } = await axiosInstance({
      url: `search/${searchType.value}`,
      params: {
        query: searchText,
        sort: "created_date",
        page: 1,
        size: 50,
      },
    });
    setListByCreatedDate(
      data.map(
        (i: {
          title: string;
          tracks: { total: number };
          wards: { total: number };
          image?: { url?: string };
        }) => ({
          title: i.title,
          listCount: i.tracks.total,
          wardCount: i.wards.total,
          imgUrl: i.image?.url,
        })
      )
    );
  };
  const getRanking = async () => {
    const { data } = await axiosInstance({
      url: "ranking",
      params: {
        type: "playlist",
      },
    });
    setRankList(
      data.map(
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
    getPlayListByRank();
    getPlayListByCreatedDate();
    getRanking();
  }, []);
  return (
    <Wrapper>
      <SearchWrapper>
        <SearchDescription>
          {options.filter((i) => i.value === type)[0]?.label}
          {type === "tag" ? "를" : "을"} 검색한 결과입니다.
        </SearchDescription>
        <SearchBar>
          <Dropdown
            value={searchType.label}
            options={options}
            onChange={handleChangeSelect}
            isSmall
          />
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
            <SearchText>{text}</SearchText> (으)로 검색하신 검색결과입니다.
          </>
        }
        subTitle={
          listByRank.length === 0
            ? "검색하신 결과가 없습니다."
            : `${text} (으)로 검색하신 분들이 즐겨 듣는 플레이리스트에요!`
        }
        items={listByRank}
      />
      <SearchResultList
        title={
          listByRank.length === 0
            ? "인기 플레이리스트 검색결과입니다."
            : "플레이리스트 검색결과입니다."
        }
        subTitle={
          listByRank.length === 0
            ? "감상을 추천드려요!"
            : "최근 추가된 플레이리스트를 감상해보세요!"
        }
        items={listByRank.length === 0 ? rankList : listByCreatedDate}
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

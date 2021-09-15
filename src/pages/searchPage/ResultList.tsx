import React, { useState, useCallback, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import queryString from "query-string";
import InputSearch from "assets/icon/i-search.svg";
import LoadingGif from "assets/img/loading.gif";
import SearchResultList from "./components/SearchResultList";
import Dropdown, { Option } from "components/Dropdown";
import { options } from "./Category";
import axiosInstance from "utils/axiosConfig";
import { PlayListItemProps } from "components/PlayListItem";
import { RankType } from "pages/mainPage/Ranking";

type SearchPlayListType = {
  playlist_id: number;
  title: string;
  tracks: { total: number };
  wards: { total: number };
  image?: { url?: string };
};

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
  const [winText, setWinText] = useState("");
  const [favoriteChampion, setFavoriteChampion] = useState("");
  const [emptyText, setEmptyText] = useState("검색하신 결과가 없습니다.");
  const [showLoading, setShowLoading] = useState(false);
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
    if (searchType.value === "summoner") {
      getSummoner();
      return;
    }
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
  const getPlayListByRank = async (champion?: string) => {
    const { data } = await axiosInstance({
      url: `search/${champion !== undefined ? "champion" : searchType.value}`,
      params: {
        query: champion || searchText,
        sort: "view",
        page: 1,
        size: 50,
      },
    });
    setListByRank(
      data.map((i: SearchPlayListType) => ({
        id: i.playlist_id,
        title: i.title,
        listCount: i.tracks.total,
        wardCount: i.wards.total,
        imgUrl: i.image?.url,
      }))
    );
  };
  const getPlayListByCreatedDate = async (champion?: string) => {
    const { data } = await axiosInstance({
      url: `search/${champion !== undefined ? "champion" : searchType.value}`,
      params: {
        query: champion || searchText,
        sort: "created_date",
        page: 1,
        size: 50,
      },
    });
    setListByCreatedDate(
      data.map((i: SearchPlayListType) => ({
        id: i.playlist_id,
        title: i.title,
        listCount: i.tracks.total,
        wardCount: i.wards.total,
        imgUrl: i.image?.url,
      }))
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
      data.map((i: RankType) => ({
        id: i.id,
        title: i.title,
        listCount: i.tracks_total,
        wardCount: i.wards_total,
        imgUrl: i.image_url,
      }))
    );
  };
  const getSummoner = async () => {
    setShowLoading(true);
    await axiosInstance({
      url: "search/summoner",
      params: {
        summoner_name: searchText,
      },
    })
      .then(({ data }) => {
        setShowLoading(false);
        const { favorite_champion, win_type } = data;
        setWinText(win_type);
        setFavoriteChampion(favorite_champion);
        getPlayListByRank(favorite_champion);
        getPlayListByCreatedDate(favorite_champion);
      })
      .catch((err) => {
        setShowLoading(false);
        setWinText("");
        setListByRank([]);
        setListByCreatedDate([]);
        if (err.response.status === 404) {
          setEmptyText("검색하신 결과가 없습니다.");
          return;
        }
        if (err.response.sataus === 403) {
          setEmptyText("일치하는 소환사 결과가 없습니다.");
          return;
        }
      });
  };
  useEffect(() => {
    getRanking();
    if (type === "summoner") {
      getSummoner();
      return;
    }
    getPlayListByRank();
    getPlayListByCreatedDate();
  }, []);
  return (
    <>
      {showLoading && (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      )}
      <Wrapper>
        <SearchWrapper>
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
        {type !== "summoner" ? (
          <>
            <SearchResultList
              title={
                <>
                  <SearchText>{text}</SearchText> (으)로 검색하신
                  검색결과입니다.
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
          </>
        ) : (
          <>
            <SearchResultList
              title={
                <>
                  <SearchText>{text}</SearchText> (으)로 검색하신
                  검색결과입니다.
                </>
              }
              subTitle={
                !winText
                  ? emptyText
                  : `${text} 님 ${winText} 중이시네요. ${favoriteChampion}를(을) 좋아하시는군요!`
              }
              items={
                listByRank.length === 0 ? [...rankList].reverse() : listByRank
              }
            />
            <SearchResultList
              title="인기 플레이리스트 검색결과입니다."
              subTitle="감상을 추천드려요!"
              items={rankList}
            />
          </>
        )}
      </Wrapper>
    </>
  );
};

export default ResultList;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
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

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
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

const LoadingWrapper = styled.div`
  display: block;
  position: fixed;
  z-index: 999;
  background-color: #00000099;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const Loading = styled.div`
  position: absolute;
  left: calc(50% - 72px);
  top: calc(50% - 55px);
  background-image: url(${LoadingGif});
  background-repeat: no-repeat;
  width: 146px;
  height: 110px;
  background-size: 100%;
`;

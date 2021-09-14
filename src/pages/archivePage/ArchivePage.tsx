import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import WardLists from "./WardLists";
import PlayCircle from "./PlayCircle";
import ArchiveInfo from "./ArchiveInfo";
import Champion from "assets/img/archivepage/background-champion.png";
import { useRecoilValue } from "recoil";
import { accessToken } from "recoil/auth";
import axiosInstance from "utils/axiosConfig";

// type IProps = {
//   tags: [];

//   playInfo: {
//     title: string;
//     description: string;
//     external_url: string;
//     playlist_id: number;
//     image: {
//       url: string;
//       width: number;
//       height: number;
//     };
//     comments: {
//       total: number;
//       items: [
//         {
//           item_id: number;
//           content: string;
//         }
//       ];
//     };
//   };

//   others: {
//     tracks: {
//       total: number;
//       items: [
//         {
//           artists: string;
//           id: number;
//           image: {
//             url: string;
//             width: number;
//             height: number;
//           };
//           original_id: string;
//           preview_url: string;
//           title: string;
//         }
//       ];
//     };
//   };
// };

const ArchivePage = () => {
  // const [tags, setTags] = useState<IProps["tags"] | undefined>();
  // const [playListInfo, setPlayListInfo] = useState<
  //   IProps["playInfo"] | undefined
  // >();
  // const [others, setOthers] = useState<IProps["others"] | undefined>();

  const jwtToken = useRecoilValue(accessToken);
  console.log(jwtToken, "access_token");

  const getMyArchive = useCallback(
    (provider) => async () => {
      const { data } = await axiosInstance({
        url: `playlists/wards/me?page=1&size=5&sort=created_date&provider=${provider}`,
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      console.log(data);
    },
    []
  );

  useEffect(() => {
    getMyArchive("SPOTIFY");
    getMyArchive("YOUTUBE");
    //     const tags: IProps["tags"] = resData.tags;
    //     setTags(tags);

    //     const playListData: IProps["playInfo"] = {
    //       title: resData.title,
    //       description: resData.description,
    //       external_url: resData.external_url,
    //       playlist_id: resData.playlist_id,
    //       image: {
    //         url: resData.image.url,
    //         width: resData.image.width,
    //         height: resData.image.height,
    //       },
    //       comments: {
    //         total: resData.comments.total,
    //         items: resData.comments.items,
    //       },
    //     };
    //     setPlayListInfo(playListData);

    //     const othersData: IProps["others"] = {
    //       tracks: {
    //         total: resData.tracks.total,
    //         items: resData.tracks.items,
    //       },
    //     };
    //     setOthers(othersData);
    //   }
    // );
  }, []);

  const calcHeight = innerHeight - 80;

  return (
    <Container height={calcHeight}>
      <Wrapper>
        <WardLists />
        <PlayCircle />
        <ArchiveInfo />
      </Wrapper>
    </Container>
  );
};

const Container = styled.section<{ height: number }>`
  width: auto;
  height: ${(props) => props.height + "px"};
  padding: 44px 140px;
  box-sizing: border-box;
  background: url(${Champion}), rgba(0, 0, 0, 0.8);
  background-blend-mode: multiply;
  background-repeat: round;
`;

const Wrapper = styled.div`
  width: 1160px;
  margin: 0 auto;
  display: flex;
`;

export default ArchivePage;

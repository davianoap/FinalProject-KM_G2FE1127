import { useEffect, useState } from "react";
import { SimpleGrid, Box } from "@chakra-ui/react";
import Song from "components/Song";
import Search from "components/Search";
import { retrieveSongs,retrieveUserId } from "services/axios.service";
import Form from "components/Form";
import { songDataInterface, selectedInterface } from "global/interfaces";
import { setUserData } from "reducer/userSlice";
import { useAppSelector } from "hooks/hooks";

const CreatePlaylist = () => {
  const token = useAppSelector((state) => state.token.value);
  const [searchSong, setSearchSong] = useState("");
  const [songData, setSongData] = useState<songDataInterface[]>([]);
  const [selectedSongs, setSelectedSongs] = useState<
    selectedInterface["uri"][]
  >([]);
  const [combineSongs, setCombineSongs] = useState<songDataInterface[]>([]);

  // basically pass songData to combineSongs and add isSelected to combineSongs
  useEffect(() => {
    const handleCombineSongs = songData.map((song: songDataInterface) => ({
      ...song,
      isSelected: selectedSongs.find((data) => data === song.uri)
        ? true
        : false,
    }));
    setCombineSongs(handleCombineSongs);
  }, [songData, selectedSongs]);

  // a function to get song data from spotify
  const getSong = () => {
    retrieveSongs(searchSong, token)
      .then((response) => {
        setSongData(response.data.tracks.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // a function to handle the select state of the song
  const handleSelect = (uri: string) => {
    const selected = selectedSongs.find((song) => song === uri);
    selected
      ? setSelectedSongs(selectedSongs.filter((song) => song !== uri))
      : setSelectedSongs([...selectedSongs, uri]);
  };

  return (
    <>
      <Box p={5}>
        <Search getSong={getSong} setSearchSong={setSearchSong} />
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="5" py="5">
          {combineSongs.map((song) => {
            const { uri, name, artists, album, isSelected } = song;
            return (
              <Song
                key={uri}
                uri={uri}
                image={album.images[0]?.url}
                title={name}
                album={artists[0]?.name}
                selectState={handleSelect}
                isSelected={isSelected}
              />
            );
          })}
        </SimpleGrid>
        <Form songUris={selectedSongs} />
      </Box>
    </>
  );
};

export default CreatePlaylist;

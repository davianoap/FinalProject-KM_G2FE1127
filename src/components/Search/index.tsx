import {
  Box,
  Button,
  Center,
  InputGroup,
  Input,
  InputRightElement,
  Text,
  Heading,
  useColorModeValue
} from "@chakra-ui/react";
import { searchInterface } from "global/interfaces";

const Search = ({ setSearchSong, getSong }: searchInterface) => {
  return (
    <>
    <Center mb="3">
      <Box>
      <Heading>Welcome to Create Playlist</Heading>
        <Text> Search song first and then fill form below track</Text>
      </Box>
    </Center>
      <Center>
        <Box w="md"
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
        >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }} pb={6}>
         Search Song
        </Heading>
          <InputGroup mb="3">
            <Input
              type="text"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setSearchSong(e.target.value)}
            />
            <InputRightElement width="4.5rem" pr="2">
              <Button
                size="sm"
                type="button"
                onClick={getSong}
                colorScheme="green"
              >
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Center>
    </>
  );
};

export default Search;

import { ChangeEvent, FormEvent, useEffect, useState, useRef } from "react";
import {
  Center,
  Button,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  useToast,
  useDisclosure,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import {
  retrieveUserId,
  createPlaylist,
  pushSongs,
} from "services/axios.service";
import { songUrisInterface } from "global/interfaces";
import { useAppSelector } from "hooks/hooks";

const Form = ({ songUris }: songUrisInterface) => {
  const token = useAppSelector((state) => state.token.value);
  const [playlistId, setPlaylistId] = useState("");
  const [userId, setUserId] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  // run addSong function when playlistId is set
  useEffect(() => {
    // a function to get the user id
    const getUserId = () => {
      retrieveUserId(token)
        .then((response) => {
          setUserId(response.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // add songs to the playlist
    const addSongs = () => {
      pushSongs(playlistId, songUris, token)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (playlistId) {
      addSongs();
    }
    getUserId();
  }, [playlistId, songUris, token]);

  // get the form data
  const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // handle form submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form.title.length > 10) {
      createPlaylist(userId, form.title, form.description, token)
        .then((response) => {
          setPlaylistId(response.data.id);
        })
        .then(() => {
          onOpen();
        })
        .catch((error) => {
          console.log(error);
        });
      setForm({ title: "", description: "" });
    } else {
      // if the title is less than 10 characters
      toast({
        title: "Error",
        description: "Title should have more than 10 words!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Center h="55vh">
        <Box w="sm" 
        bg={useColorModeValue('white', 'gray.700')}
        p={6}
        my={12}
        rounded={'xl'}
        boxShadow={'lg'}
        >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }} pb={6}>
          Create Playlist
        </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl mb="3" isRequired>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                type="text"
                placeholder="Your Title"
                id="title"
                name="title"
                value={form.title}
                onChange={handleForm}
              />
              <FormHelperText>Make sure more than 10 words!</FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="title">Description</FormLabel>
              <Input
                type="text"
                placeholder="Description"
                id="description"
                name="description"
                value={form.description}
                onChange={handleForm}
              />
              <FormHelperText>Make sure more than 10 words!</FormHelperText>
            </FormControl>
            <Button
              mt="3"
              w="100%"
              id="submit"
              type="submit"
              colorScheme="green"
            >
              Create
            </Button>
          </form>
        </Box>
      </Center>

      {/* alert dialog */}
      <AlertDialog
        motionPreset="slideInBottom"
        onClose={onClose}
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Yay, You Successfully Created A Playlist!!
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            You've added {songUris.length} songs to your playlist!
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose} colorScheme="green">
              Understand
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Form;

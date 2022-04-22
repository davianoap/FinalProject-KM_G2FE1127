import { useState } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Spacer,
  Text,
  Avatar,
  Button,
  ButtonProps,
  useColorMode,
  AvatarBadge,
  Image,
} from "@chakra-ui/react";
import { useAppSelector } from "hooks/hooks";
import logo from "assets/spotify-logo.png";
import { BsSun, BsMoonStarsFill } from 'react-icons/bs';

const Navbar = () => {
  const userData = useAppSelector((state)=> state.user.data);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box w="full" px={4} bgColor="whiteAlpha.100">
        <Flex alignItems="center" h={16}>
          <Box>
            <Image boxSize="32px" src={logo} alt="Spotify Logo" />
          </Box>
          <Spacer ml="auto" />
          <Button  onClick={toggleColorMode} mr={3}>
            {colorMode === "light" ? <BsSun /> : <BsMoonStarsFill />}
          </Button>
          <Box bgColor="whiteAlpha.300" borderRadius="xl">
            <Flex alignItems="center" pl={3}>
              <Text mr={2}>{userData.display_name}</Text>
              <Avatar
                size="md"
                name={userData.display_name}
                src={userData.images[0]?.url}
              />
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;

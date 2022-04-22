import { useState } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Spacer,
  Text,
  Avatar,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";
import { useAppSelector } from "hooks/hooks";

const Navbar = () => {
  const userData = useAppSelector((state)=> state.user.data);

  return (
    <>
      <Box w="full" px={4} bgColor="whiteAlpha.100">
        <Flex alignItems="center" h={16}>
          <Text fontSize="xl" fontWeight="bold" ml={4}>
            Testing 2
          </Text>
          <Spacer ml="auto" />
          <Box bgColor="whiteAlpha.300" borderRadius="full">
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

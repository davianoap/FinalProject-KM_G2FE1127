import {
  Box,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";

const NavbarBefore = () => {
  return (
    <>
      <Box w="full" px={4} bgColor="whiteAlpha.100">
        <Flex alignItems="center" h={16}>
          <Text fontSize="xl" fontWeight="bold" ml={4}>
            Welcome to Create Playlists
          </Text>
          <Spacer ml="auto" />
        </Flex>
      </Box>
    </>
  );
};

export default NavbarBefore;

import { Box, Center, Flex } from '@chakra-ui/layout'

export const Mp4Icon = (props: {
  width?: string
  height?: string
  fill?: string
}) => (
  <Flex
    w="65px"
    h="80px"
    bg="blue.300"
    mx="auto"
    color="#FFFFFF"
    borderRadius="3px"
    justify="center"
    align="center"
    fontSize="23px"
    pos="relative"
    textShadow="4px 4px 4px rgba(0, 0, 0, 0.3)"
  >
    <Center
      bg="blue.400"
      pos="absolute"
      bottom="15px"
      left="-10px"
      w="60px"
      h="35px"
      borderRadius="4px"
      textAlign="center"
      sx={{
        _before: {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: '#000',
          borderRadius: '4px',
          opacity: '0.1',
          bottom: '-5px',
          right: '-5px',
        },
      }}
    >
      <Box
        bg="blue.500"
        h="100%"
        w="100%"
        fontWeight="700"
        zIndex="1"
        pos="relative"
        borderRadius="4px"
        sx={{
          _before: {
            content: '""',
            position: 'absolute',
            width: '90%',
            height: '85%',
            backgroundColor: 'blue.400',
            borderRadius: '4px',
            borderBottomLeftRadius: '10px',
            top: '0',
            right: '0',
            zIndex: '-1',
          },
        }}
      >
        MP4
        {/* OGG */}
        {/* JS */}
      </Box>
    </Center>
  </Flex>
)
export const WebMIcon = (props: {
  width?: string
  height?: string
  fill?: string
}) => (
  <Flex
    w="65px"
    h="80px"
    bg="blue.300"
    mx="auto"
    color="#FFFFFF"
    borderRadius="3px"
    justify="center"
    align="center"
    fontSize="15px"
    pos="relative"
    textShadow="4px 4px 4px rgba(0, 0, 0, 0.3)"
  >
    <Box
      bg="blue.400"
      pos="absolute"
      bottom="15px"
      left="-10px"
      w="60px"
      h="35px"
      whiteSpace="nowrap"
      borderRadius="4px"
      textAlign="center"
      sx={{
        _before: {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: '#000',
          borderRadius: '4px',
          opacity: '0.1',
          bottom: '-5px',
          right: '-5px',
        },
      }}
    >
      <Center
        bg="blue.500"
        h="100%"
        w="100%"
        fontWeight="700"
        zIndex="1"
        pos="relative"
        borderRadius="4px"
        sx={{
          _before: {
            content: '""',
            position: 'absolute',
            width: '90%',
            height: '85%',
            backgroundColor: 'blue.400',
            borderRadius: '4px',
            borderBottomLeftRadius: '10px',
            top: '0',
            right: '0',
            zIndex: '-1',
          },
        }}
      >
        WEBM
      </Center>
    </Box>
  </Flex>
)
export const GitIcon = (props: {
  width?: string
  height?: string
  fill?: string
}) => (
  <Flex
    w="80px"
    h="80px"
    bg="blue.400"
    mx="auto"
    color="#FFFFFF"
    borderRadius="full"
    justify="center"
    align="center"
    fontSize="15px"
    pos="relative"
    textShadow="4px 4px 4px rgba(0, 0, 0, 0.3)"
  >
    <Box w="70px" h="70px" bg="blue.300" borderRadius="full">
      <Box
        h="45px"
        w="5px"
        borderRadius="full"
        bg="blue.400"
        pos="absolute"
        left="37px"
        top="15px"
      ></Box>
      <Box
        h="35px"
        w="5px"
        borderRadius="full"
        bg="blue.400"
        pos="absolute"
        transform="rotate(-45deg)"
        transformOrigin="0% 0%"
        left="35px"
        top="20px"
      ></Box>

      <Box
        w="15px"
        h="15px"
        borderRadius="full"
        bg="blue.300"
        pos="absolute"
        left="32px"
        top="15px"
        fontSize="10px"
        border="5px solid"
        borderColor="blue.400"
      ></Box>
      <Box
        w="15px"
        h="15px"
        borderRadius="full"
        bg="blue.300"
        pos="absolute"
        left="32px"
        bottom="15px"
        border="5px solid"
        borderColor="blue.400"
      ></Box>
      <Box
        w="15px"
        h="15px"
        borderRadius="full"
        bg="blue.300"
        pos="absolute"
        left="50px"
        top="32px"
        border="5px solid"
        borderColor="blue.400"
      ></Box>
    </Box>
  </Flex>
)

export const FolderIcon = (props: {
  width?: string
  height?: string
  fill?: string
}) => (
  <Box mx="auto" w="100px" h="80px" my={3}>
    <Flex
      w="100px"
      h="80px"
      mx="auto"
      color="#FFFFFF"
      justify="center"
      align="flex-end"
      fontSize="40px"
      pos="relative"
      textShadow="4px 4px 4px rgba(0, 0, 0, 0.3)"
    >
      <Box
        bg="blue.400"
        w="100%"
        h="70px"
        pos="absolute"
        opacity="0.5"
        borderRadius="full"
      ></Box>
      <Box bg="blue.300" w="100%" h="70px" borderRadius="full"></Box>
      <Box
        bg="blue.300"
        w="80%"
        h="75px"
        pos="absolute"
        borderRadius="full"
        transform="skew(0deg, 5deg)"
        left="0"
        top="0"
      ></Box>
      <Box
        w="90%"
        ml="5%"
        h="45px"
        borderRadius="full"
        boxShadow="-5px -2px 4px rgba(0, 0, 0, 0.1)"
        bg="#ffffff"
        transform="skew(0deg, 2deg)"
        zIndex="2"
        pos="absolute"
        left="0"
        top="8px"
      ></Box>
      <Box
        bg="blue.300"
        w="100%"
        pos="absolute"
        h="65px"
        transform="skew(0deg, -5deg)"
        right="0"
        top="10px"
        borderRadius="full"
        boxShadow="-1px 0px 3px rgba(0, 0, 0, 0.1)"
        zIndex="3"
      ></Box>
    </Flex>
  </Box>
)

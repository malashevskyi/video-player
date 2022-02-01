import { Box, Flex } from '@chakra-ui/layout'
import { ManagerEntryType } from '../../../types'
import { GitIcon, Mp4Icon, WebMIcon } from './'

type GetIconType = {
  file: ManagerEntryType
}

const GetIcon = ({ file }: GetIconType) => {
  const { name } = file
  const ext = name.slice(name.lastIndexOf('.'))

  if (ext === '.mp4') {
    return <Mp4Icon />
  }
  if (ext === '.webm') {
    return <WebMIcon />
  }
  if (ext === '.gitignore') {
    return <GitIcon />
  }

  return (
    <Box mx="auto" w="100px" h="80px" my={3}>
      <Flex
        w="80px"
        h="80px"
        bg="blue.300"
        mx="auto"
        color="#FFFFFF"
        borderRadius="full"
        justify="center"
        align="center"
        fontSize="40px"
        textShadow="4px 4px 4px rgba(0, 0, 0, 0.3)"
        pos="relative"
        overflow="hidden"
      >
        <Box
          w="100%"
          h="100%"
          bg="blue.400"
          top="32px"
          left="-25px"
          transform="rotate(35deg)"
          pos="absolute"
        ></Box>
        <Box
          w="70%"
          h="90%"
          bg="blue.500"
          top="15%"
          borderRadius="full"
          pos="absolute"
          zIndex="1"
          transform="skew(30deg)"
        ></Box>
        <Box
          w="70%"
          h="90%"
          bg="blue.300"
          top="10%"
          left="30%"
          borderRadius="full"
          pos="absolute"
          zIndex="1"
          transform="skew(50deg)"
        ></Box>
        <Box
          w="70%"
          h="90%"
          bg="blue.400"
          top="10%"
          left="30%"
          borderRadius="full"
          pos="absolute"
          zIndex="1"
          transform="skew(50deg)"
        ></Box>
      </Flex>
    </Box>
  )
}

export default GetIcon

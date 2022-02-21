import { Box, List } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import CreateTimestamp from './CreateTimestamp'
import SearchTimestamp from './SearchTimestamp'

const Sidebar = () => {
  const state = useSelector((state: RootState) => state.videoModal)

  return (
    <Box
      w="450px"
      overflow="hidden"
      h="100vh"
      pos="absolute"
      zIndex={9}
      right="0%"
      top="50%"
      transition={`opacity 0.3s ease ${state.sidebarIsOpen ? 0 : 0.4}s`}
      opacity={state.sidebarIsOpen ? '1' : '0'}
      transform="translate(0, -50%)"
      pointerEvents={state.sidebarIsOpen ? 'auto' : 'none'}
    >
      <Box
        bg="white"
        h="100%"
        overflow="auto"
        w="450px"
        pr="0px"
        willChange="transform"
        transition={`transform 0.3s ease`}
        transform={`translate(${state.sidebarIsOpen ? 0 : 450}px, 0)`}
      >
        <List spacing={3} p={5} overflow="hidden" h="100vh">
          <SearchTimestamp />
          <CreateTimestamp />
        </List>
      </Box>
    </Box>
  )
}

export default Sidebar

import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import { Box } from '@chakra-ui/react'

const VideoTitle = () => {
  const state = useSelector((state: RootState) => state.videoModal)

  return (
    <Box pos="absolute" top="0" left="0" bg="white" p={2}>
      {state.videoTitle}
    </Box>
  )
}

export default VideoTitle

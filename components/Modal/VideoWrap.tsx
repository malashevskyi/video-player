import { Box, VStack } from '@chakra-ui/react'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import VideoPlayer from './VideoPlayer'
import VideoTitle from './VideoTitle'

const VideoWrap = () => {
  const state = useSelector((state: RootState) => state.videoModal)
  const ref = useRef<HTMLVideoElement>(null)
  const popupWrapRef = useRef<HTMLDivElement>(null)

  return (
    <VStack
      alignItems="stretch"
      justify="center"
      pos="relative"
      spacing={0}
      // pr={state.sidebarIsOpen ? '450px' : '0'}
      transition="padding 0.3s ease"
      ref={popupWrapRef}
    >
      <Box pos="relative" pt="40px">
        {/* switch button */}
        {/* video progress bar */}
        <VideoTitle />
        <VideoPlayer ref={ref} />
      </Box>
      {/* <VideoControls>

      </VideoControls> */}
    </VStack>
  )
}

export default VideoWrap

import { Box } from '@chakra-ui/layout'
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/modal'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useFetch from '../../hooks/useFetch'
import { RootState, videoModalActions } from '../../store'
import Sidebar from './Sidebar'
import VideoWrap from './VideoWrap'

const VideoPopup = () => {
  const state = useSelector((state: RootState) => state.videoModal)
  const dispatch = useDispatch()

  const [{ response: setNewVideoResponse }, doSetNewVideoUrl] =
    useFetch('api/set-video-url')

  useEffect(() => {
    // handle response of new video url set
    console.log('set new video response', setNewVideoResponse)
    if (!setNewVideoResponse) return

    const timeout1 = setTimeout(() => {
      console.log('loaded')
      dispatch(videoModalActions.setVideoIsLoaded())
    }, 300)
    const timeout2 = setTimeout(() => {
      dispatch(videoModalActions.displayVideo())
    }, 600)

    return () => {
      clearTimeout(timeout1)
      clearTimeout(timeout2)
    }
  }, [setNewVideoResponse])

  useEffect(() => {
    // load new video
    // on click a video in the sidebar, a file in the manager or a timestamp
    console.log('video url changed')
    if (!state.videoUrl) return

    doSetNewVideoUrl({
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        data: {
          videoUrl: state.videoUrl,
        },
      }),
    })
  }, [state.videoUrl, state.videoId])

  const onCloseHandler = () => {
    // close modal, stop video
    dispatch(videoModalActions.closeVideoPopup())
  }

  return (
    <>
      <Modal isOpen={state.videoPopupIsOpen} onClose={onCloseHandler}>
        <ModalOverlay />
        <ModalContent
          maxW="calc(100vw - 50px)"
          maxH="calc(100vw - 50px)"
          minW="auto"
          minH="auto"
          w="auto"
          h="auto"
          my="auto"
          transition="opacity 0.4s ease"
        >
          <ModalBody p={0}>
            <Box overflow="hidden" position="relative">
              <VideoWrap />
            </Box>
            <Sidebar />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default VideoPopup

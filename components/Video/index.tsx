import { Box } from '@chakra-ui/layout'
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/modal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, videoModalActions } from '../../store'

const VideoPopup = () => {
  const state = useSelector((state: RootState) => state.videoModal)
  const dispatch = useDispatch()

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
              Video
            </Box>
            Sidebar
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default VideoPopup

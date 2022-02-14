import { Button } from '@chakra-ui/button'
import { Icon } from '@chakra-ui/icons'
import { Box, Center, HStack } from '@chakra-ui/layout'
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/slider'
import { memo } from 'react'
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi'
import { CgPlayList } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, videoModalActions } from '../../store'
import GoToVideoButton from './GoToVideoButton'

type ModalButtonsType = {
  onPlayPause: () => void
  setTime: (value: number) => void
  onFullScreen: () => void
}

const VideoControls = memo(
  ({ onPlayPause, setTime, onFullScreen }: ModalButtonsType) => {
    const state = useSelector((state: RootState) => state.videoModal)
    const managerState = useSelector((state: RootState) => state.manager)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const dispatch = useDispatch()

    const onOpenPlaylist = () => {
      // setIsOpen(!isOpen)
      onOpen()
    }

    const loadNewVideo = (type: string) => {
      const files = managerState.videoFilesOfCurrentDir
      const currentFile = state.videoTitle

      let index = files.findIndex((el) => el === currentFile)
      if (typeof index !== 'number') return

      if (type === 'next') {
        if (index === files.length - 1) {
          index = 0
        } else {
          index++
        }
      }
      if (type === 'prev') {
        if (index === 0) {
          index = files.length - 1
        } else {
          index--
        }
      }

      const fileName = files[index]
      const videoUrl = managerState.currentDirectory + fileName

      dispatch(videoModalActions.startWatchingVideo({ videoUrl, fileName }))
    }

    const goToPrevVideo = () => {
      loadNewVideo('prev')
    }
    const goToNextVideo = () => {
      loadNewVideo('next')
    }

    const onSetNewVideoHandler = (fileName: string) => {
      const videoUrl = managerState.currentDirectory + fileName
      dispatch(videoModalActions.startWatchingVideo({ videoUrl, fileName }))
    }

    return (
      <>
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Playlist</DrawerHeader>

            <DrawerBody>
              {/* <Input placeholder="Type here..." /> */}
              {managerState.videoFilesOfCurrentDir.map((file) => {
                return (
                  <Button
                    w="100%"
                    whiteSpace="normal"
                    px={4}
                    py={3}
                    mb={2}
                    h="auto"
                    onClick={() => onSetNewVideoHandler(file)}
                  >
                    {file}
                  </Button>
                )
              })}
              {/* <Files files={managerState.videoFilesOfCurrentDir} /> */}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <HStack px={2} spacing={2} h="44px" mb={0} pos="relative">
          {/*play button*/}
          {/*prev/next*/}

          <GoToVideoButton onClick={goToPrevVideo} icon={BiSkipPrevious} />
          <Button
            pos="relative"
            bg="white"
            borderRadius="full"
            onClick={onPlayPause}
            _hover={{
              bg: 'white',
              boxShadow: 'none',
            }}
            _focus={{
              boxShadow: 'none',
            }}
            _after={{
              content: '""',
              height: '0',
              width: '0',
              left: 3,
              position: 'relative',
              borderLeft: '9px solid transparent',
              borderRight: '9px solid transparent',
              borderTop: '17px solid #3182ce',
              transform: 'rotate(-90deg)',
              pos: 'absolute',
            }}
          ></Button>
          <GoToVideoButton onClick={goToNextVideo} icon={BiSkipNext} />

          {/*time*/}
          <HStack spacing={2} fontSize="14px">
            <Center w="60px" whiteSpace="nowrap">
              {state.displayTime}
            </Center>
            <Center>{state.displayDuration}</Center>
          </HStack>

          {/*slider*/}
          <Box px={4} flex="1">
            <Slider
              value={
                (state.currentTime / state.currentVideoDuration) * 100 || 0
              }
              onChange={setTime}
              aria-label="slider-ex-1"
              defaultValue={30}
              focusThumbOnChange={false}
            >
              <SliderTrack mt="2px">
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb mt="2px" />
            </Slider>
          </Box>

          {/*playlist*/}

          <Button
            onClick={onOpenPlaylist}
            p={0}
            h="35px"
            w="35px"
            bg="white"
            boxShadow="none"
            color="blue.500"
            _hover={{ bg: 'white' }}
            _focus={{ bg: 'white', boxShadow: 'none' }}
          >
            <Icon w="30px" h="30px" as={CgPlayList}></Icon>
          </Button>

          {/*rate badge*/}

          <Button
            p={0}
            h="35px"
            w="35px"
            bg="white"
            boxShadow="none"
            color="blue.500"
            _hover={{ bg: 'white' }}
            _focus={{ bg: 'white', boxShadow: 'none' }}
          >
            {state.videoSpeed}
          </Button>

          {/*fullscreen icon*/}
          <Button
            borderRadius="full"
            pos="relative"
            bg="white"
            h="35px"
            w="35px"
            p={0}
            onClick={onFullScreen}
            _hover={{
              bg: 'white',
            }}
            _focus={{
              boxShadow: 'none',
            }}
          >
            <Center
              pos="relative"
              border="2px solid"
              borderColor="blue.500"
              w="20px"
              h="20px"
              borderRadius="3px"
              _before={{
                content: '""',
                width: '20px',
                height: '5px',
                display: 'block',
                position: 'absolute',
                zIndex: '1',
                backgroundColor: 'white',
                transition: 'background .3s ease',
              }}
              _after={{
                content: '""',
                height: '20px',
                width: '5px',
                display: 'block',
                position: 'absolute',
                zIndex: '1',
                backgroundColor: 'white',
                transition: 'background .3s ease',
              }}
            >
              <Box
                pos="absolute"
                as="span"
                w="20px"
                h="2px"
                bg="blue.500"
                transform="rotate(45deg)"
              ></Box>
              <Box
                pos="absolute"
                as="span"
                h="20px"
                w="2px"
                bg="blue.500"
                transform="rotate(45deg)"
              ></Box>
            </Center>
          </Button>
        </HStack>
      </>
    )
  }
)

export default VideoControls

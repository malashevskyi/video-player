import { AddIcon } from '@chakra-ui/icons'
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { FormEvent, memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useFetch from '../../../hooks/useFetch'
import { RootState, videoModalActions } from '../../../store'
import { TimestampType } from '../../../types'
import FetchedTimestamps from './FetchedTimestamps'

const CodeEditor = dynamic(() => import('@uiw/react-textarea-code-editor'), {
  ssr: false,
})

const CreateTimestamp = memo(() => {
  const [timestampTitle, setTimestampTitle] = useState<string>('')
  const [timestampDescription, setTimestampDescription] = useState<string>('')
  const [scrollEndTrigger, setScrollEndTrigger] = useState<boolean>(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editedTimestamp, setEditedTimestamp] = useState<{} | null>(null)

  const state = useSelector((state: RootState) => state.videoModal)
  const managerState = useSelector((state: RootState) => state.manager)

  const dispatch = useDispatch()

  const [timestampsData, doCreateTimestamp] = useFetch('api/create-timestamp')
  const [timestampsEditData, doEditTimestamp] = useFetch('api/edit-timestamp')

  const pauseVideo = () => {
    const video = document.getElementById(
      'modalVideo'
    ) as HTMLVideoElement | null

    if (video) {
      video.pause()
    }
  }

  const playVideo = () => {
    const video = document.getElementById(
      'modalVideo'
    ) as HTMLVideoElement | null

    if (video && video.paused) {
      video.play()
    }
  }

  const onOpenModalHandler = () => {
    setTimestampTitle('')
    setTimestampDescription('')
    setEditedTimestamp(null)
    pauseVideo()
    onOpen()
  }

  // handle creating a new timestamp and get new timestamp
  const onSubmitNewTimestampHandler = async (event: FormEvent) => {
    event.preventDefault()

    doCreateTimestamp({
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        data: {
          title: timestampTitle,
          description: timestampDescription,
          time: +state.currentTime.toFixed(),
          directory: managerState.currentDirectory,
          fileName: state.videoTitle,
        },
      }),
    })
  }

  // getting response of creating a timestamp
  useEffect(() => {
    if (!timestampsData.response) return

    const timestamps = timestampsData.response

    dispatch(videoModalActions.setTimestamps(timestamps))

    onClose()
    playVideo()
    setScrollEndTrigger(!scrollEndTrigger)
  }, [timestampsData.response])

  const onCloseModalHandler = () => {
    playVideo()
    onClose()
  }

  const onEditTimestampOpenHandler = (timestamp: TimestampType) => {
    setTimestampTitle(timestamp.title)
    setTimestampDescription(timestamp.description)
    setEditedTimestamp(timestamp)
    onOpen()
  }

  // handle a timestamp editing
  const onEditTimestampHandler = () => {
    doEditTimestamp({
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        data: {
          ...editedTimestamp,
          title: timestampTitle,
          description: timestampDescription,
          directory: managerState.currentDirectory,
        },
      }),
    })
  }

  // getting response of edit a timestamp
  useEffect(() => {
    if (!timestampsEditData.response) return

    const timestamps = timestampsEditData.response
    dispatch(videoModalActions.setTimestamps(timestamps))

    onClose()
    playVideo()
  }, [timestampsEditData.response])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onCloseModalHandler}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={7}>
            <VStack spacing={5} alignItems="flex-end">
              <FormControl id="title">
                <FormLabel>Timestamp title</FormLabel>
                <Input
                  value={timestampTitle}
                  onChange={(event) => setTimestampTitle(event.target.value)}
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <CodeEditor
                  value={timestampDescription}
                  language="js"
                  placeholder="Please enter some code."
                  onChange={(event) =>
                    setTimestampDescription(event.target.value)
                  }
                  padding={15}
                  style={{
                    fontSize: 12,
                    backgroundColor: '#f5f5f5',
                    fontFamily:
                      'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                  }}
                />
              </FormControl>
              <Button
                type="submit"
                onClick={
                  editedTimestamp
                    ? onEditTimestampHandler
                    : onSubmitNewTimestampHandler
                }
              >
                Submit
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      <HStack pos="relative" mb="20px">
        <Button onClick={onOpenModalHandler}>
          <AddIcon />
        </Button>
        <Center fontSize="20px" h="40px" opacity={0.3}>
          {state.displayTime}
        </Center>
      </HStack>
      <FetchedTimestamps
        scrollEndTrigger={scrollEndTrigger}
        onEditTimestampOpen={onEditTimestampOpenHandler}
      />
    </>
  )
})

export default CreateTimestamp

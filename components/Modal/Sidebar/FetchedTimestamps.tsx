import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useFetch from '../../../hooks/useFetch'
import { RootState, videoModalActions } from '../../../store'
import { FetchTimestampsType, TimestampType } from '../../../types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Badge, Box, Button, Flex, HStack, VStack } from '@chakra-ui/react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

const FetchedTimestamps = ({
  onEditTimestampOpen,
  scrollEndTrigger,
}: FetchTimestampsType) => {
  const timestampsContainer = useRef<HTMLDivElement>(null)
  const [timestampsData, doReadTimestamps] = useFetch('api/read-timestamps')
  const [{ response: deleteTimestampResponse }, doDeleteTimestamp] = useFetch(
    'api/delete-timestamp'
  )
  const state = useSelector((state: RootState) => state.videoModal)
  const managerState = useSelector((state: RootState) => state.manager)
  const dispatch = useDispatch()

  // fetch current video folder timestamps
  useEffect(() => {
    doReadTimestamps({
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        data: {
          directory: managerState.currentDirectory,
        },
      }),
    })
  }, [managerState.currentDirectory])

  // handle getting timestamps response
  useEffect(() => {
    if (!timestampsData.response) return

    const timestamps = timestampsData.response

    dispatch(videoModalActions.setTimestamps(timestamps))
  }, [timestampsData.response])

  useEffect(() => {
    setTimeout(() => {
      if (timestampsContainer.current) {
        timestampsContainer.current.scrollTo(
          0,
          timestampsContainer.current.scrollHeight
        )
      }
    })
  }, [scrollEndTrigger])

  const goToNewTimestamp = (time: number, fileName: string) => {
    if (state.videoTitle !== fileName) {
      dispatch(
        videoModalActions.startWatchingVideo({
          videoUrl: managerState.currentDirectory + fileName,
          fileName,
          startTime: time,
        })
      )
    } else {
      const video = document.getElementById('modalVideo') as HTMLVideoElement

      if (video) {
        video.currentTime = +time
      }
    }
  }

  // handle a timestamp deleting
  const onDeleteTimestampHandler = (timestamp: TimestampType) => {
    doDeleteTimestamp({
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        data: {
          id: timestamp.id,
          directory: managerState.currentDirectory,
        },
      }),
    })
    const timestamps = state.timestamps.filter(({ id }) => timestamp.id !== id)

    dispatch(videoModalActions.setTimestamps(timestamps))
  }

  return (
    <Box h="calc(100vh - 150px)" ref={timestampsContainer} overflow="auto">
      {/* iterate filtered timestamps if exist, otherwise show all timestamps */}
      {(state.filteredTimestamps.length > 0
        ? state.filteredTimestamps
        : state.timestamps
      ).map((timestamp) => {
        return (
          <Box key={timestamp.id} pos="relative" w="100%" mb={4}>
            <HStack alignItems="stretch">
              <VStack spacing={1}>
                <Badge
                  cursor="pointer"
                  onClick={() => onDeleteTimestampHandler(timestamp)}
                  p={1}
                >
                  <AiOutlineDelete opacity={0.5} />
                </Badge>
                <Badge
                  cursor="pointer"
                  onClick={() => onEditTimestampOpen(timestamp)}
                  p={1}
                >
                  <AiOutlineEdit opacity={0.5} />
                </Badge>
              </VStack>
              <Flex flexDirection="column" flex="1">
                <Button
                  variant="ghost"
                  fontSize="14px"
                  whiteSpace="normal"
                  justifyContent="flex-start"
                  p={2}
                  onClick={() =>
                    goToNewTimestamp(timestamp.time, timestamp.fileName)
                  }
                  id={timestamp.id}
                  h="auto"
                  width="100%"
                  textAlign="left"
                >
                  {timestamp.title}
                </Button>
                <Box flex={1} fontSize="14px" px={2} whiteSpace="pre">
                  {timestamp.description && (
                    <SyntaxHighlighter language="javascript" style={docco}>
                      {timestamp.description}
                    </SyntaxHighlighter>
                  )}
                </Box>
              </Flex>
            </HStack>
          </Box>
        )
      })}
    </Box>
  )
}

export default FetchedTimestamps

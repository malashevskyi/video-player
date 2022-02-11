import { Box } from '@chakra-ui/react'
import { forwardRef, SyntheticEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, videoModalActions } from '../../store'

const VideoPlayer = forwardRef<HTMLVideoElement>((_, ref: any) => {
  const state = useSelector((state: RootState) => state.videoModal)
  const managerState = useSelector((state: RootState) => state.manager)
  const dispatch = useDispatch()

  // handle end of video, start new video
  useEffect(() => {
    if (!state.videoEnded) return

    loadNewVideo()
  }, [])

  const loadNewVideo = () => {
    const files = managerState.videoFilesOfCurrentDir
    const currentFileName = state.videoTitle

    let index = files.findIndex((el) => el === currentFileName)
    if (typeof index !== 'number') return

    if (index === files.length - 1) {
      index = 0
    } else {
      index++
    }

    const fileName = files[index]
    const videoUrl = managerState.currentDirectory + fileName
    dispatch(videoModalActions.startWatchingVideo({ videoUrl, fileName }))
  }

  const onLoadedDataHandler = (video: EventTarget) => {
    if (!(video instanceof HTMLVideoElement)) return

    setTimeout(() => {
      video.currentTime = state.startTime
      if (video.paused) {
        video.play()
        video.playbackRate = state.videoSpeed
      }

      // dispatch(videoModalActions.setVideoDuration(video.duration))
      // video.addEventListener('timeupdate', () => {
      //   dispatch(videoModalActions.setTime(video.currentTime))
      // })
      video.addEventListener('ended', () => {
        dispatch(videoModalActions.setVideoIsLoaded())
      })
    }, 200)

    setNewVideoSize()
  }

  const setNewVideoSize = () => {
    const height = ref.current.clientHeight
    const width = ref.current.clientWidth

    const size = { h: height, w: width }

    dispatch(videoModalActions.setVideoSize(size))
  }

  if (state.videoLoading) {
    // set box with prev video size when a new video is loading
    return (
      <Box
        w={`${state.videoWidth}px`}
        h={`${state.videoHeight}px`}
        bg="black"
      ></Box>
    )
  }

  return (
    <Box
      w={state.videoDisplay ? state.videoWidth : 'auto'}
      h={state.videoDisplay ? state.videoHeight : 'auto'}
      id="modalVideo"
      ref={ref}
      as="video"
      onLoadedData={(event: SyntheticEvent) =>
        onLoadedDataHandler(event.currentTarget)
      }
      maxH="calc(100vh - 110px)"
    >
      <source src={`api/video-chunk:${state.videoId}`} type="video/mp4" />
    </Box>
  )
})

export default VideoPlayer

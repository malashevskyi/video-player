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
  }, [state.videoEnded])

  // observe video width with ResizeObserve
  // update height depending on new video size ratio
  useEffect(() => {
    if (!ref.current) return

    const { clientWidth, videoWidth, videoHeight } = ref.current

    const observer = new ResizeObserver(() => {
      if (clientWidth < videoWidth) {
        const ratio = videoWidth / clientWidth

        dispatch(
          videoModalActions.setVideoSize({
            h: videoHeight / ratio,
          })
        )
      }
    })

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref.current])

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

      dispatch(videoModalActions.setVideoDuration(video.duration))
      video.addEventListener('timeupdate', () => {
        dispatch(videoModalActions.setTime(video.currentTime))
      })
      video.addEventListener('ended', () => {
        dispatch(videoModalActions.setVideoIsEnded())
      })
    }, 200)

    setNewVideoSize()
  }

  const setNewVideoSize = () => {
    let { clientHeight, clientWidth, videoWidth, videoHeight } = ref.current

    // define correct size with ratio
    const ratio1 = videoWidth / videoHeight
    const ratio2 = clientWidth / clientHeight

    if (Math.abs(ratio1 - ratio2) > 0.02) {
      const ratio = videoHeight / clientHeight
      clientWidth = videoWidth / ratio
    }

    const size = { h: clientHeight, w: clientWidth }

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
      w={state.videoWidth}
      h={state.videoHeight}
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

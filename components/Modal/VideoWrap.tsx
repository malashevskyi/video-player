import { Box, VStack } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, videoModalActions } from '../../store'
import VideoPlayer from './VideoPlayer'
import VideoTitle from './VideoTitle'
import screenfull from 'screenfull'
import VideoControls from './VideoControls'
import SwitchButton from './Sidebar/SwitchButton'

const VideoWrap = () => {
  const state = useSelector((state: RootState) => state.videoModal)
  const ref = useRef<HTMLVideoElement>(null)
  const popupWrapRef = useRef<HTMLDivElement>(null)

  const dispatch = useDispatch()

  useEffect(() => {
    const video = ref.current as HTMLVideoElement | null

    if (video) {
      window.addEventListener('keydown', onKeydownFullScreen)
      window.addEventListener('keydown', onKeyupChangeVideoSpeed)
      window.addEventListener('keydown', onKeyupChangeCurrentTime)
      window.addEventListener('keyup', onVideoEnterPress)
      video.addEventListener('click', onPlayPause)
    }

    return () => {
      if (video) {
        window.addEventListener('keydown', onKeydownFullScreen)
        window.removeEventListener('keydown', onKeyupChangeVideoSpeed)
        window.removeEventListener('keydown', onKeyupChangeCurrentTime)
        window.removeEventListener('keyup', onVideoEnterPress)
        video.removeEventListener('click', onPlayPause)
      }
    }
  }, [ref.current])

  // handle video playbackRate change
  useEffect(() => {
    if (ref.current) {
      ref.current.playbackRate = state.videoSpeed
    }
  }, [state.videoSpeed])

  const onVideoEnterPress = (event: KeyboardEvent) => {
    console.log('event', event)
    if (event.target instanceof HTMLInputElement) return
    if (event.target instanceof HTMLTextAreaElement) return
    // if (event.key === 'Enter') {
    if (event.code === 'Space') {
      onPlayPause()
    }
  }
  const onKeydownFullScreen = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'Enter') {
      onFullScreenHandler()
    }
  }

  const onKeyupChangeVideoSpeed = (event: KeyboardEvent) => {
    const video = ref.current as HTMLVideoElement | null

    if (!video) return
    if (!ref.current) return

    if (event.ctrlKey && event.key === 'c') {
      video.playbackRate += 0.1

      const speed = +video.playbackRate.toFixed(1)
      dispatch(videoModalActions.changeVideoSpeed(speed))
    } else if (event.ctrlKey && event.key === 'x') {
      video.playbackRate -= 0.1

      const speed = +video.playbackRate.toFixed(1)
      dispatch(videoModalActions.changeVideoSpeed(speed))
    }
  }
  const onKeyupChangeCurrentTime = (event: KeyboardEvent) => {
    if (event.target instanceof HTMLInputElement) return
    if (event.target instanceof HTMLTextAreaElement) return

    const video = ref.current as HTMLVideoElement | null
    if (!video) return
    if (!ref.current) return

    if (event.key === 'ArrowRight') {
      const newTime = video.currentTime + 5
      if (newTime < video.duration) {
        video.currentTime = newTime
      }
    } else if (event.key === 'ArrowLeft') {
      const newTime = video.currentTime - 5
      if (newTime > 0) {
        video.currentTime = newTime
      }
    }
  }

  const setTime = (value: number) => {
    if (!ref.current) return

    const u = value / 100 // get %

    ref.current.currentTime = ref.current.duration * u - 0.3
  }

  const onFullScreenHandler = () => {
    const videoElement = ref.current as HTMLVideoElement | null

    try {
      if (screenfull && screenfull.isEnabled && videoElement) {
        screenfull.request(videoElement)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const onPlayPause = () => {
    if (!ref.current) return

    if (ref.current.paused) {
      ref.current.play()
    } else {
      ref.current.pause()
      dispatch(videoModalActions.setIsPlaying(false))
    }
  }

  return (
    <VStack
      alignItems="stretch"
      justify="center"
      pos="relative"
      spacing={0}
      pr={state.sidebarIsOpen ? '450px' : '0'}
      transition="padding 0.3s ease"
      ref={popupWrapRef}
    >
      <Box pos="relative" pt="40px">
        <SwitchButton />
        {/* video progress bar */}
        <VideoTitle />
        <VideoPlayer ref={ref} />
      </Box>
      <VideoControls
        onPlayPause={onPlayPause}
        setTime={setTime}
        onFullScreen={onFullScreenHandler}
      />
    </VStack>
  )
}

export default VideoWrap
